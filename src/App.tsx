import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonSearchbar,
} from '@ionic/react';

interface Contact
{
  ID: number,
  Cognome: string,
  Nome: string,
  Telefono: string,
  Email: string
}

interface searcProps{
  onChange(searchTerm: string): void
}
function Search(props: searcProps){
  return(
    <IonItem>
    <IonLabel>filtro (facoltativo)</IonLabel>
    <IonInput type="text" onIonInput={(e: any) =>props.onChange(e.target.value)}></IonInput>
   </IonItem>
  );
}

interface tableProps{
  list: Contact[],
  pattern: string,
  onDismiss(ID: Contact["ID"]): void
}
function Table(props: tableProps){
  return (
    <IonList>
      {props.list.filter(isSearched(props.pattern)).map((item: Contact) =>{            
            return(
              <IonItem key={item.ID}>
                <IonLabel>{item.ID}</IonLabel>
                <IonLabel>{item.Nome}</IonLabel>
                <IonLabel>{item.Cognome}</IonLabel>
                <IonLabel>{item.Telefono}</IonLabel>
                <IonButton onClick={() => props.onDismiss(item.ID)}>Dismiss</IonButton>
              </IonItem>  
            )
          }
        )}
    </IonList>
  );
}
function isSearched(searchTerm: string) {
  return function (item: Contact) {
    return item.Cognome.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  }
}

class App extends React.Component<{},{list: Contact[], searchTerm: string,isLoading:boolean, error: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
      searchTerm: '',
      isLoading: false,
      error: ""
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(ID: Contact["ID"]) {
    // funzioni: eseguite solo se chiamate
    const isNotId = (item: Contact) => item.ID !== ID;
    const updatedList = this.state.list.filter(isNotId);

    // istruzione:
    this.setState({ list: updatedList });
        // Oppure tutto in un'unica riga:
    // const updatedList = this.state.list.filter(item => item.objectID !== id);
  }
  componentDidMount() {
    var config = {
      headers: {'PAGN': '1'}
    };
    axios.get('https://cloud.touristorganizer.com/wstour/Rubrica?Cognome=*', config)
        .then(response => {
            this.setState({list: response.data.Rubrica, isLoading: false, error: ""})
        })
        .catch(ex => {
            console.log(ex);
            this.setState({...this.state, isLoading: false, error: ex.message});
        });  
  }    
  onSearchChange(value: string) {
    this.setState({ searchTerm: value });
  }
  render() {
    const { searchTerm, list } = this.state;
    return (
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Rubrica v1.0</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Search 
            onChange={this.onSearchChange}
          />
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </IonContent>
      </IonApp>
    );
  }
}

export default App;
