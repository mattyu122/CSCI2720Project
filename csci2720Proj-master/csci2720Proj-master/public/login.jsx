// Name: Yung King Fung SID:1155112412
// Name: Tsang Ka Hung SID:1155112415
// Name: Yu Ka Wai SID:1155125476
 window.addEventListener('popstate', function(e) {
     console.log('pop');
     let stateObj = e.state;
     if (stateObj.name == "EventTable") {
         EventTable(true);
     }else if (stateObj.name == "EventDetail") {
         EventDetailPage(true, stateObj.event_id);
     }else if (stateObj.name == "Favourite") {
         FavouriteTable(true);
     }else if (stateObj.name == "CreateEvent") {
         CreateEventPage(true);
     }else if (stateObj.name == "EditEvent") {
         EditEventPage(true, stateObj.event)
     }
 });

function Logout() {
    $.ajax({
        url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/Logout',
        method: 'GET',
        contentType: 'application/json',
        dataType: 'text',
        success: function(result) {
            sessionStorage.removeItem('username');
            window.location.replace('http://csci2720-g11.cse.cuhk.edu.hk/');
            ReactDOM.render(
                <App />,
                document.querySelector("#app")
            );
        }
    });
}

function Login() {
    // console.log("login process...");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = {username: username, password: password};
    var errmsg = '';
    if (username.length < 4 || username.length > 20) {
        errmsg += "Username must be between 4-20 characters!\n";
    }
    if (password.length < 4 || password.length > 20) {
        errmsg += "Password must be between 4-20 characters!\n";
    }

    if (errmsg != '') {
        alert(errmsg);
    }else{
        data = JSON.stringify(data);

        $.ajax({
            url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/ValidateUser',
            method: 'POST',
            contentType: 'application/json',
            data: data,
            dataType: 'text',
            success: function(result) {
                var json = JSON.parse(result);
                if (json.loginstate == 0) {
                    alert("Login failed!");
                }else{
                    sessionStorage.setItem('username', username)
                    alert("Login successful!\nLogin username:"+sessionStorage.getItem('username'));
                    EventTable(false, 1);
                }

            }
        });
    }

}

function Register() {
    console.log('register');
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = {username: username, password: password};
    var errmsg = '';
    if (username.length < 4 || username.length > 20) {
        errmsg += "Username must be between 4-20 characters!\n";
    }
    if (password.length < 4 || password.length > 20) {
        errmsg += "Password must be between 4-20 characters!\n";
    }

    if (errmsg != '') {
        alert(errmsg);
    }else{
        data = JSON.stringify(data);

        $.ajax({
            url: 'http://csci2720-g11.cse.cuhk.edu.hk/api/CreateUser',
            method: 'POST',
            contentType: 'application/json',
            data: data,
            dataType: 'text',
            success: function(result) {
                alert(result);
            }
        });
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameerrormessage: '',
            passworderrormessage: ''
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    handleUsername(event) {
        if (event.target.value.length < 4 || event.target.value.length > 20) {
            this.setState({usernameerrormessage: "Username must be between 4-20 characters!"});
        }else{
            this.setState({usernameerrormessage: ""});
        }
    }
    handlePassword(event) {
        if (event.target.value.length < 4 || event.target.value.length > 20) {
            this.setState({passworderrormessage: "Password must be between 4-20 characters!"});
        }else{
            this.setState({passworderrormessage: ""});
        }
    }

    render(){
        return(
            <>
            <nav className="navbar navbar-dark bg-dark">
              <div className="container">
                <span className="navbar-brand mx-auto" href="#">HKEvents</span>
              </div>
            </nav>

            <img src="hongkong.jpg" className="img-fluid" alt="Responsive image"/>

             <div className="row">
              <div className="col-sm col-lg-7 col-xl-7 bg-light p-1 p-lg-5 border">
              	<h1 className="display-4">News</h1>
                <hr/>
                <h2 style={{fontWeight: "normal"}}>Welcome!</h2><br/>
              	<p>
                This is a social network for public events in Hong Kong. We retrieve event information from Hong Kong government datasets,
                and allow users to favourite and also comment on certain events.
              	</p>
                <hr/>
                <h2 style={{fontWeight: "normal"}}>To Get Started</h2><br/>
                <p>
                Register an user account a with username (unique string of 4–20 characters) and password (string of 4–20 characters)on the right panel.
                </p>
              </div>

              <div className="col-sm col-lg-5 col-xl-5 border p-5">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Username</label><br/>
                    <input type="text" className="form-control" id="username" onChange={this.handleUsername}/>
                  </div>
                  <span className="text-center" style={{color:"red"}}>{this.state.usernameerrormessage}</span>
                  <div className="form-group">
                    <label htmlFor="password">Password</label><br/>
                    <input type="password" className="form-control" id="password" onChange={this.handlePassword}/>
                  </div>
                  <span style={{color:"red"}}>{this.state.passworderrormessage}</span>
                  <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input text-center" id="exampleCheck1"/>
                      <label className="form-check-label text-center" htmlFor="exampleCheck1">Check me out</label>
                  </div>
                  <div className="form-group">
                    <button type="button" className="btn btn-primary text-center px-2" onClick={Login}>Login</button>
                    <button type="button" className="btn btn-secondary text-center ml-3 px-2" onClick={Register}>Register</button>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </form>
              </div>
             </div>

             <footer className="text-right text-light bg-dark p-2">
               This website was built on July, 2020. <strong>© Tsang Ka Hung, Yung King Fung, Matt Yu Ka Wai</strong>
             </footer>
            </>
        );
    }
}

class App extends React.Component {
    render(){
        return(
          <LoginForm/>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#app")
);
