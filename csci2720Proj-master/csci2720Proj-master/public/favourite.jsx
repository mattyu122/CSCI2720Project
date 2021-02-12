// Name: Yung King Fung SID:1155112412
// Name: Tsang Ka Hung SID:1155112415
// Name: Yu Ka Wai SID:1155125476
function FavouriteTable(isPop) {
    // var page = document.getElementById("page").value;
    $.ajax({
        url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Favourite',
        method: 'GET',
        contentType: 'application/json',
        dataType: 'text',
        success: function(result) {
            if (!isPop) {
                console.log("in ispop equal false");
                let stateObj = {
                    name: "Favourite"
                };//testing only
                window.history.pushState(stateObj,
                                 "Favourite", "/Favourite");
            }
            var json = JSON.parse(result);
            ReactDOM.render(
                <FavouritesTable json={json} />,
                document.querySelector("#app")
            );
        }
    });
}

class FavouritesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            sortby: -1
        };
        this.delFavourite = this.delFavourite.bind(this);
        this.sortEvent = this.sortEvent.bind(this);;
    }
    delFavourite(event, id){
        event.stopPropagation();
        $.ajax({
            url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Favourite/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'text',
            success: function(result) {
                alert(result);
                FavouriteTable();
            }
        });
    }

    sortEvent(event){
        if (this.state.sortby != event) {
            this.setState({sortby:event});
        }else{
            this.setState({sortby:-1});
        }

        alert('sort by ' + this.state.sortby);
    }

    render(){
        return(
            <>
            <Navbar/>
            <div className='container-fluid' style={{marginTop: '50px'}}>
                <table className='table table-hover table-striped'>
                <thead>
                <tr>
                    <th></th>
                    <th onClick={()=>this.sortEvent(1)}>#</th>
                    <th onClick={()=>this.sortEvent(2)}>Summary</th>
                    <th onClick={()=>this.sortEvent(3)}>Date</th>
                    <th onClick={()=>this.sortEvent(4)}>Org</th>
                </tr>
                </thead>
                <tbody>
                {this.props.json.map((event, index) => (
                    <tr key={index} onClick={()=>EventDetailPage(false, event.event_id)}>
                        <td><button type="button" className="btn btn-danger" onClick={(e)=>this.delFavourite(e, event.event_id)}>-</button></td>
                        <td>{event.event_id}</td>
                        <td>{event.event_summary}</td>
                        <td>{event.event_date}</td>
                        <td>{event.event_org}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            </>
        )
    }
}
