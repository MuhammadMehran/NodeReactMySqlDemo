import React, { Component, ChangeEvent } from 'react';
import './App.css';
import { VehicleAndOwnerData, SimulatedSignal } from './interface';
import Vehicle from './components/vehicle/Vechicle';
import Owner from './components/owner/Owner';

export interface AppProps {

}

export interface AppState {
  data: VehicleAndOwnerData[];
  filterByName: string;
  onlineStatusDisabled: boolean;
  onlineStatus: boolean;
}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      data: [],
      filterByName: "",
      onlineStatusDisabled: true,
      onlineStatus: true
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
      if (this.state.filterByName !== "") {
        if (!entriesOfOwner[0].customer_name.toLowerCase().includes(this.state.filterByName.toLowerCase())) {
          return;
        }
      }
      const vehicles = entriesOfOwner.map((dataEntry) => {

        if (this.state.onlineStatusDisabled) {
          return (
            <Vehicle
              key={dataEntry.vin}
              vin={dataEntry.vin}
              regNumber={dataEntry.reg_number}
              signal={dataEntry.signal} />
          )
        } else {
          // Filter Vehicles according to the status provided
          if (this.state.onlineStatus == dataEntry.signal) {
            return (
              <Vehicle
                key={dataEntry.vin}
                vin={dataEntry.vin}
                regNumber={dataEntry.reg_number}
                signal={dataEntry.signal} />
            )

          } else {
            return;
          }
        }

      });

      // When there are no vehicles to show for the specific customer, don't show anything at all
      if (vehicles.length == 0) {
        return;
      }

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
        <div>
          <input
            type="text"
            placeholder="Filter by company name"
            name="Filter By Name"
            value={this.state.filterByName}
            onChange={this.onFilterByNameChange} />

          <div><input
            name="Online Status Disabled"
            type="checkbox"
            checked={this.state.onlineStatusDisabled}
            onChange={this.handleOnlineStatusChange} /> Disabled Filter By Online Status
            </div>

          <div onChange={this.onOnlineStatusChange}>
            <input type="radio" value="ONLINE" name="Online Status" disabled={this.state.onlineStatusDisabled} checked={this.state.onlineStatus} /> Online
            <input type="radio" value="OFFLINE" name="Online Status" disabled={this.state.onlineStatusDisabled} /> Offline
          </div>
        </div>
        {listOwnersWithVehicles}
      </div>
    );
  }

  onFilterByNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterByName: event.target.value });
  }

  handleOnlineStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ onlineStatusDisabled: event.target.checked })
  }

  onOnlineStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ onlineStatus: event.target.value == "ONLINE" });
  }

}

export default App;
