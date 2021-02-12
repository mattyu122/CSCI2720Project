// Name: Yung King Fung SID:1155112412
// Name: Tsang Ka Hung SID:1155112415
// Name: Yu Ka Wai SID:1155125476
class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark topnav">
                <span className="navbar-brand" href="#">HKEvents</span>
                <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav mr-auto">
                    <li><button className="btn btn-link" style={{color: 'white'}} onClick={()=>EventTable(false, 1)}>Event</button></li>
                    <li><button className="btn btn-link" style={{color: 'white'}} onClick={()=>FavouriteTable(false)}>Favourite</button></li>
                    <li><button className="btn btn-link" style={{color: 'white'}} onClick={()=>AboutPage(false)}>About</button></li>
                  </ul>
                  <ul className="nav navbar-nav ml-auto">
                    <li><button className="btn btn-link" style={{color: 'white'}}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      </svg>
                      <span>&nbsp;</span>{sessionStorage.getItem('username')}
                    </button></li>
                    <li><button className="btn btn-link" style={{color: 'white'}} onClick={Logout}>
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-box-arrow-in-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8.146 11.354a.5.5 0 0 1 0-.708L10.793 8 8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 1 8z"/>
                        <path fillRule="evenodd" d="M13.5 14.5A1.5 1.5 0 0 0 15 13V3a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 4 3v1.5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 5 13v-1.5a.5.5 0 0 0-1 0V13a1.5 1.5 0 0 0 1.5 1.5h8z"/>
                      </svg>
                      <span>&nbsp;</span>Logout
                    </button></li>
                  </ul>
                </div>
            </nav>
        )
    }
}

class Dropdown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        selected: "Summary"
      };
      this.toggleOpen = this.toggleOpen.bind(this);
      this.setSelected = this.setSelected.bind(this);
  }

  toggleOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  setSelected(selected){
      this.setState({ selected: selected });
  }

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="dropdown ml-5 mt-2 d-inline" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
        Search By {this.state.selected}
        </button>
        <div className={menuClass} id="dropdown" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" onClick={(e)=>{this.setSelected("Event ID");this.props.handleClick("event_id")}}>
            Event ID
          </a>
          <a className="dropdown-item" href="#" onClick={(e)=>{this.setSelected("Summary");this.props.handleClick("event_summary")}}>
            Summary
          </a>
          <a className="dropdown-item" href="#" onClick={(e)=>{this.setSelected("Date");this.props.handleClick("event_date")}}>
            Date
          </a>
          <a className="dropdown-item" href="#" onClick={(e)=>{this.setSelected("Organization");this.props.handleClick("event_org")}}>
            Organization
          </a>
        </div>
      </div>
    );
  }
}

class EventDetail extends React.Component {
    constructor(props) {
        super(props);
        this.deleteEvent = this.deleteEvent.bind(this);
    }
    deleteEvent(){
        var id = this.props.json.event_id;
        $.ajax({
            url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Event/' + id,
            method: 'DELETE',
            dataType: 'text',
            success: function(result) {
                alert(result);
                EventTable();
            }
        });
    }
    render(){
        if (!this.props.json.exist) {
            return(
                <>
                <Navbar/>
                <div className='container' style={{marginTop: '50px'}}>
                    <p>Event Not Exist Anymore!</p>
                </div>
                </>
            )
        }else{
            return(
                <>
                <Navbar/>
                <div className='container' style={{marginTop: '50px'}}>
                    <button className="btn btn-primary" onClick={()=>EditEventPage(false, this.props.json)}>Edit Event</button>
                    <button className="btn btn-danger" onClick={this.deleteEvent}>Delete Event</button>
                    <div className="card" style={{width: '50rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.json.event_summary}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{this.props.json.event_org}</h6>
                            <p className="card-text">Date:<br/> {this.props.json.event_date}</p>
                            <p className="card-text">Location:<br/> {this.props.json.event_location}</p>
                            <p className="card-text">Description:<br/> {this.props.json.event_desc}</p>
                            <a href="#" className="card-link">{this.props.json.event_url}</a>
                        </div>
                    </div>
                    <Comments eventid={this.props.json.event_id}/>
                    <CommentForm eventid={this.props.json.event_id}/>
                </div>
                </>
            )
        }
    }
}


function EventTable(isPop, page, sort = 1, search = undefined, field = undefined) {
    console.log(page);
    console.log(sort);
    var newLink = "/Event?page="+page+"&sort_by="+sort;
    var newUrl = 'http://csci2720-g11.cse.cuhk.edu.hk/api/Event?page=' + page + "&sort_by=" + sort;
    if (search !== undefined) {
        newLink += "&search="+search+"&field="+field;
        newUrl += "&search="+search+"&field="+field;
    }

    $.ajax({
        url: newUrl,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'text',
        success: function(result) {
            if (!isPop) {
                let stateObj = {
                    name: "EventTable"
                };//testing only
                window.history.pushState(stateObj,
                                 "Event", newLink);
            }
            var json = JSON.parse(result);
            ReactDOM.render(
                <EventsTable json={json} page={page}/>,
                document.querySelector("#app")
            );
        }
    });
}

function EventDetailPage(isPop, id){
    $.ajax({
        url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Event/' + id,
        method: 'GET',
        contentType: 'application/json',
        dataType: 'text',
        success: function(result) {
            if (!isPop) {
                let stateObj = {
                    event_id: id,
                    name: "EventDetail"
                };//testing only
                window.history.pushState(stateObj,
                                 "EventDetail", "/Event/" + id);
            }
            var json = JSON.parse(result);
            ReactDOM.render(
                <EventDetail json={json} />,
                document.querySelector("#app")
            );
        }
    });
}

class PageItem extends React.Component {
    render(){
        return(
            <li className="page-item" key={this.props.page}><button className="page-link" onClick={()=>EventTable(false, this.props.page, this.props.sortby, this.props.search, this.props.field)}>{this.props.page}</button></li>
        )
    }
}

class EventsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            sortby: -1,
            search: "",
            field: "event_summary"
        };
        this.addFavourite = this.addFavourite.bind(this);
        this.sortEvent = this.sortEvent.bind(this);
        this.reload = this.reload.bind(this);
        this.createPageItem = this.createPageItem.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.selectField = this.selectField.bind(this);
    }
    addFavourite(event, id){
        event.stopPropagation();
        $.ajax({
            url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Favourite/' + id,
            method: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            success: function(result) {
                alert(result);
            }
        });
    }

    sortEvent(event){
        if (this.state.sortby != event) {
            this.setState({sortby:event}, () => {
              alert('sort by ' + this.state.sortby);
              EventTable(false, this.props.page, this.state.sortby, this.state.search, this.state.field);
            });
        }else{
            this.setState({sortby:(event * -1)}, () => {
              alert('sort by ' + this.state.sortby);
              EventTable(false, this.props.page, this.state.sortby, this.state.search, this.state.field);
            });
        }
    }
    reload(event){
        alert("reloading...wait until another alert box come out after close this alert");
        $.ajax({
            url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Reload',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            success: function(result) {
                EventTable(false, 1);
                alert(result);
            }
        });
    }
    createPageItem(count, curPage){
        var totalPage = Math.ceil(count/10);
        let li = [];
        if (totalPage<=15) {
            for (var i = 1; i <= totalPage; i++) {
                li.push(
                    <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                );
            }
        }else{
            if (curPage<=5) {
                for (var i = 1; i <= 10; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
                li.push(
                    '...'
                );
                for (var i = totalPage; i <= totalPage; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
            }else if (curPage===6) {
                for (var i = 1; i <= 11; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
                li.push(
                    '...'
                );
                for (var i = totalPage; i <= totalPage; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
            }else if (curPage === totalPage-5) {
                for (var i = 1; i <= 1; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
                li.push(
                    '...'
                );
                for (var i = totalPage-9; i <= totalPage; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
            }else if(curPage >= totalPage-4){
                for (var i = 1; i <= 1; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
                li.push(
                    '...'
                );
                for (var i = totalPage-8; i <= totalPage; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
            }else{
                for (var i = 1; i <= 1; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
                li.push(
                    '...'
                );
                for (var i = curPage-4; i <= curPage+4; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
                li.push(
                    '...'
                );
                for (var i = totalPage; i <= totalPage; i++) {
                    li.push(
                        <PageItem key={i} page={i} sortby={this.state.sortby} search={this.state.search} field={this.state.field}/>
                    );
                }
            }
        }


        return li;
    }

    componentDidMount() {
      document.querySelector("#searchBtn").onclick = () => {
        event.preventDefault();
        alert("Search " + this.state.search + " By " + this.state.field);

        EventTable(false, 1, 1, this.state.search, this.state.field);
        }
    }

    handleSearch(event){
        this.setState({search: event.target.value});
    }

    selectField(selected) {
        event.preventDefault();
        this.setState({field: selected});
    }

    render(){
        return(
            <>
            <Navbar/>
            <img src="ibanner.jpg" className="img-fluid" alt="Responsive image"/>
            <div className='container-fluid row' style={{marginTop: '20px'}}>
                <button className="btn btn-danger ml-5 mr-5 col" onClick={this.reload}>Reload Event</button>
                <button className="btn btn-primary mr-5 col" onClick={()=>CreateEventPage(false)}>Create Event</button>
            </div>
            <div className='container-fluid'>
                <form className="d-inline form-inline md-form form-sm ml-5" action="index.html" method="post">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                  </svg>
                  <input className="form-control form-control-sm ml-3 w-50 mr-3" id="searchQuery" type="text" placeholder="Search" aria-label="Search" onChange={this.handleSearch}/>
                  <button className="btn btn-info" id="searchBtn" style={{display: "none"}} type="submit">Search</button>
                </form>

                <Dropdown handleClick={this.selectField.bind(this)}/>
            </div>
            <div className='container-fluid'>
                <table className='table table-hover table-striped mt-4'>
                <thead>
                <tr>
                    <th></th>
                    <th onClick={()=>this.sortEvent(1)}><button type="button" className="btn btn-light btn-block">#</button></th>
                    <th onClick={()=>this.sortEvent(2)}><button type="button" className="btn btn-light btn-block">Summary</button></th>
                    <th onClick={()=>this.sortEvent(3)}><button type="button" className="btn btn-light btn-block">Date</button></th>
                    <th onClick={()=>this.sortEvent(4)}><button type="button" className="btn btn-light btn-block">Org</button></th>
                </tr>
                </thead>
                <tbody>
                {this.props.json[1] !== undefined ? this.props.json[1].map((event, index) => (
                    <tr key={index} onClick={()=>EventDetailPage(false, event.event_id)}>
                        <td><button type="button" className="btn btn-primary" onClick={(e)=>this.addFavourite(e, event.event_id)}>+</button></td>
                        <td>{event.event_id}</td>
                        <td>{event.event_summary}</td>
                        <td>{event.event_date}</td>
                        <td>{event.event_org}</td>
                    </tr>
                )) : console.log("empty")}
                </tbody>
                </table>
                <div className="overflow-auto">
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        {this.props.json[1] !== undefined ? this.createPageItem(this.props.json[0].count, this.props.page) : console.log("empty")}
                    </ul>
                </nav>
                </div>
            </div>
            </>
        )
    }
}

function CreateEventPage(isPop){
    if (!isPop) {
        let stateObj = {
            name: "CreateEvent"
        };//testing only
        window.history.pushState(stateObj,
                         "CreateEvent", "/CreateEvent");
    }
    ReactDOM.render(
        <CreateEvent/>,
        document.querySelector("#app")
    );
}

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).on("click", ".processCreateEventForm", function() {
            let $object = {};
            $object["event_summary"] = $("#summary").val();
            $object["event_desc"] =  $("#description").val();
            $object["event_date"] = $("#date").val();
            $object["event_org"] = $("#org").val();
            $object["event_location"] = $("#loc").val();
            $object["event_url"] = $("#url").val();

    		$object = JSON.stringify($object);
            console.log($object);
    		$.ajax({
    		  url: "http://csci2720-g11.cse.cuhk.edu.hk/api/Event",
    		  type: "POST",
    		  data: $object,
              contentType: 'application/json',
              dataType: 'text'
          }).done(function(res) {
              alert(res);
              EventTable(false);
          });
        });
    }
    render(){
        return(
            <>
            <Navbar/>
            <div className='container' style={{marginTop: '50px'}}>
                <h2>Create Event</h2>
                <form className="createEventForm" action="index.html" method="post">

                <div className="form-group">
                  <label htmlFor="summary">Event Summary:</label>
                  <input type="text" className="form-control" id="summary"/>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Event Date:</label>
                  <input type="text" className="form-control" id="date"/>
                </div>

                <div className="form-group">
                  <label htmlFor="org">Event Organization:</label>
                  <input type="text" className="form-control" id="org"/>
                </div>

                <div className="form-group">
                  <label htmlFor="loc">Event Location:</label>
                  <input type="text" className="form-control" id="loc"/>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Event Description:</label>
                  <textarea name="description" rows="3" cols="80" className="form-control" id="description"></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="url">Event Link:</label>
                  <input type="text" className="form-control" id="url"/>
                </div>



                <button type="button" name="button" className="processCreateEventForm btn btn-outline-success">Submit</button>

                </form>
            </div>
            </>
        )
    }
}

function EditEventPage(isPop, event){
    if (!isPop) {
        let stateObj = {
            event: event,
            name: "EditEvent"
        };//testing only
        window.history.pushState(stateObj,
                         "EditEvent", "/EditEvent");
    }
    console.log(event);
    ReactDOM.render(
        <EditEvent event={event}/>,
        document.querySelector("#app")
    );
}

class EditEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var event = this.props.event;

        $(document).on("click", ".processEditEventForm", function() {
            let $object = {};
            if ($("#summary").val() == "") {
                $object["event_summary"] = $("#summary").attr('placeholder');
            }else{
                $object["event_summary"] = $("#summary").val();
            }
            if ($("#date").val() == "") {
                $object["event_date"] = $("#date").attr('placeholder');
            }else{
                $object["event_date"] = $("#date").val();
            }
            if ($("#description").val() == "") {
                $object["event_desc"] = $("#description").attr('placeholder');
            }else{
                $object["event_desc"] =  $("#description").val();
            }
            if ($("#org").val() == "") {
                $object["event_org"] = $("#org").attr('placeholder');
            }else{
                $object["event_org"] = $("#org").val();
            }
            if ($("#loc").val() == "") {
                $object["event_location"] = $("#loc").attr('placeholder');
            }else{
                $object["event_location"] = $("#loc").val();
            }
            if ($("#url").val() == "") {
                $object["event_url"] = $("#url").attr('placeholder');
            }else{
                $object["event_url"] = $("#url").val();
            }

            function getEventId() {
                return event.event_id;
            }
    		$object = JSON.stringify($object);
            console.log($object);
    		$.ajax({
    		  url: "http://csci2720-g11.cse.cuhk.edu.hk/api/Event/" + event.event_id,//event id here
    		  type: "PUT",
    		  data: $object,
              contentType: 'application/json',
              dataType: 'text'
          }).done(function(res) {
              alert(res);
              EventDetailPage(false, getEventId());
          });
        });
    }
    render(){
        return(
            <>
            <Navbar/>
            <div className='container' style={{marginTop: '50px'}}>
                <h2>Edit Event {this.props.event.event_id}</h2>
                <form className="editEventForm" action="index.html" method="post">

                <div className="form-group">
                  <label htmlFor="summary">Event Summary:</label>
                  <input type="text" className="form-control" id="summary" placeholder={this.props.event.event_summary}/>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Event Date:</label>
                  <input type="text" className="form-control" id="date" placeholder={this.props.event.event_date}/>
                </div>

                <div className="form-group">
                  <label htmlFor="org">Event Organization:</label>
                  <input type="text" className="form-control" id="org" placeholder={this.props.event.event_org}/>
                </div>

                <div className="form-group">
                  <label htmlFor="loc">Event Location:</label>
                  <input type="text" className="form-control" id="loc" placeholder={this.props.event.event_location}/>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Event Description:</label>
                  <textarea name="description" rows="3" cols="80" className="form-control" id="description" placeholder={this.props.event.event_desc}></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="url">Event Link:</label>
                  <input type="text" className="form-control" id="url" placeholder={this.props.event.event_url}/>
                </div>



                <button type="button" name="button" className="processEditEventForm btn btn-outline-success">Submit</button>

                </form>
            </div>
            </>
        )
    }
}
