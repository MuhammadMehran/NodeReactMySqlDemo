import React, { Component } from 'react';
import './App.css';
import { VehicleAndOwnerData, SimulatedSignal } from './interface';
import Vehicle from './components/vehicle/Vechicle';
import Owner from './components/owner/Owner';

export interface AppProps {

}

export interface AppState {
  data: VehicleAndOwnerData[];
}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    await fetch("http://localhost:3001/vehicles")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Fetching data failed");
        }
      })
      .then(data => {
        const dataWithSignal = data.map((dataEntry: VehicleAndOwnerData) => {
          return Object.assign(dataEntry, { signal: false })
        })
        this.setState({ data: dataWithSignal });
      });
    this.fetchSignals();
    setInterval(this.fetchSignals, 3000)
  }

  fetchSignals = async () => {
    await fetch('http://localhost:3002/', { method: "GET" })
      .then((response) => response.json())
      .then((responseData) => {

        //Looping through vehicle date and filling in the signal values accordingly to the response
        const dataWithSignal = this.state.data.map((dataEntry: VehicleAndOwnerData) => {
          const result = responseData.find((item: SimulatedSignal) => {
            return item.vin == dataEntry.vin;
          })

          return Object.assign(dataEntry, { signal: result.signal })
        })
        this.setState({ data: dataWithSignal });

      })
      .catch((error) => {
        console.error("ERRO FETCHING SIGNALS");
      });
  }

  render() {

    //get all uniqe owners' ids
    const ownerIds: Set<number> = new Set([]);
    this.state.data.forEach((item: VehicleAndOwnerData) => {
      ownerIds.add(item.user_id);
    });

    // Group the data by owners and their vehicles
    let listOwnersWithVehicles: any[] = [];
    ownerIds.forEach((ownerId: number) => {

      // List of data entries of vehicles owned by specific owner
      const entriesOfOwner = this.state.data.filter(dataEntry => {
        return dataEntry.user_id == ownerId;
      })

      // Get only specific owner's vehicles
      const vehicles = entriesOfOwner.map((dataEntry) => {
        return (
          <Vehicle
            key={dataEntry.vin}
            vin={dataEntry.vin}
            regNumber={dataEntry.reg_number}
            signal={dataEntry.signal} />
        )
      });

      // Find owner's details
      const specificOwner = entriesOfOwner.find((dataEntry: VehicleAndOwnerData) => {
        return dataEntry.user_id == ownerId;
      });

      // Add the required components in the render list
      if (specificOwner) {
        listOwnersWithVehicles.push(
          <div key={specificOwner.user_id}>
            <Owner
              id={specificOwner.user_id}
              name={specificOwner.customer_name}
              address={specificOwner.customer_address}
            />
            {vehicles}
          </div>
        )
      }
    });

    return (
      <div className="App">
        {listOwnersWithVehicles}
      </div>
    );
  }
}

export default App;
