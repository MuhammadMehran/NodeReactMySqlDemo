import React, { Component } from 'react';
import './App.css';
import { VehicleAndOwnerData, Owner } from './interface';
import Vehicle from './components/vehicle/Vechicle';

export interface AppProps {

}

export interface AppState {
  data: VehicleAndOwnerData[];
}

class App extends Component<AppProps, AppState> {
  owners: Owner[] = [];
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

        //get all uniqe owner id's
        const uniqueOwnerTags: number[] = [];
        data.map((item: VehicleAndOwnerData) => {
          if (uniqueOwnerTags.indexOf(item.ownerId) === -1) {
            uniqueOwnerTags.push(item.ownerId)
            this.owners.push({
              ownerId: item.ownerId,
              owner: item.owner,
              ownerAddess: item.ownerAddess
            })
          }
        });
        this.setState(data);
      });
  }

  render() {
    let listOwnersWithVehicles: any[] = [];
    // Group the data by owners and their vehicles
    if (this.state.data && this.owners) {
      listOwnersWithVehicles = this.owners.map((item: Owner) => {

        // Get only that specific owner's vehicles
        const vehicles = this.state.data.map((dataEntry) => {
          if (dataEntry.ownerId == item.ownerId) {
            return (
              <Vehicle
                vin={dataEntry.vin}
                regNumber={dataEntry.regNumber}
                signal={dataEntry.signal} />
            )
          }
        });

        // Generate owner and show below all his/hers owned vehicles
        return ([
          <li key={item.ownerId} className="owner">
            {item.ownerId}
            {item.owner}
            {item.ownerAddess}
          </li>,
          (vehicles)
        ]);
      });
    }

    return (
      <div className="App">
        {this.state.data && listOwnersWithVehicles}
      </div>
    );
  }
}

export default App;
