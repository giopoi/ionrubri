import React from 'react'
import { Link, match } from 'react-router-dom'
interface DetailParams {
  id: string;
}
interface DetailsProps {
  required: string;
  match?: match<DetailParams>;
}
class Users extends React.Component<DetailsProps, any> {
  render() {
    const match = this.props.match;
    if (match){
      return (
        <div>
          {/* il punto esclamativo per evitare: Object is possibly 'undefined'.ts(2532)  */}
          <div>Details for {match!.params.id}</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>Utente inesistente</div>
          <Link to='/'>Goto Home</Link>
        </div>
      )
    }
  }
}
export default Users