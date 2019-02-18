import React, { Component } from 'react';
import './App.css';
import { VehicleAndOwnerData} from './interface';
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
        data.forEach((element: any) => {
          element = { ...element, signal: false }
        });
        this.setState({ data });
      });
  }

  render() {

    //get all uniqe owners' ids
    const ownerIds: Set<number> = new Set([]);
    this.state.data.forEach((item: VehicleAndOwnerData) => {
      ownerIds.add(item.user_id);
    });

    //add all owners in a list

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

      // Generate owner and show below owned vehicles
      const specificOwner = this.state.data.find((dataEntry: VehicleAndOwnerData) => {
        return dataEntry.user_id == ownerId;
      });

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
