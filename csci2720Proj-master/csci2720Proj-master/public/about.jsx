// Name: Yung King Fung SID:1155112412
// Name: Tsang Ka Hung SID:1155112415
// Name: Yu Ka Wai SID:1155125476
function AboutPage(isPop) {
    if (!isPop) {
        let stateObj = {
            name: "AboutPage"
        };//testing only
        window.history.pushState(stateObj,
                         "About", "/About");
    }
    ReactDOM.render(
        <About/>,
        document.querySelector("#app")
    )
}

class About extends React.Component {
    render(){
        return(
            <>
                <Navbar/>
                <GroupInfo/>
                <Howto/>
                <DatabaseDesign/>
                <AcademicHonesty/>
            </>
        );
    }
}

class GroupInfo extends React.Component {
    render(){
        return(
            <div className="container-fluid">
                <h3>Group Infomation</h3>
                <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>SID</th>
                    <th>workload Distribution</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Tsang Ka Hung</td>
                    <td>1155112415</td>
                    <td>
                        <ul>
                            <li>Server Setup</li>
                            <li>Database Setup</li>
                            <li>User Login/Register/Logout</li>
                            <li>CRUD Event</li>
                            <li>Event Table Pagination</li>
                            <li>Detail Event Page</li>
                            <li>Comment Session</li>
                            <li>CRD Favourite</li>
                            <li>Access/Reload Gov Data API</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Yung King Fung</td>
                    <td>1155112412</td>
                    <td>
                        <ul>
                            <li>Sorting Event Table</li>
                            <li>Searching Event Table</li>
                            <li>Data Model Design</li>
                            <li>UI Styling</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Yu Ka Wai</td>
                    <td>1155125476</td>
                    <td>
                        <ul>
                            <li>Styling</li>
                            <li>Debug</li>
                            <li>Testing</li>
                        </ul>
                    </td>
                </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

class Howto extends React.Component {
    render(){
        return(
            <div className="container-fluid">
                <h3>How-to</h3>
                <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Function</th>
                    <th>Process</th>
                    <th>Remark</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Login</td>
                    <td>
                        <ol>
                            <li>Input Username and password</li>
                            <li>Click Login Button</li>
                            <li>alert show success/failure</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Register</td>
                    <td>
                        <ol>
                            <li>Input Username and password</li>
                            <li>Click Register Button</li>
                            <li>alert show success/failure</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Logout</td>
                    <td>
                        <ol>
                            <li>Click Logout button on the nav bar</li>
                            <li>Back to Login page</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Event Table</td>
                    <td>
                        <ol>
                            <li>Show 10 events on each page</li>
                            <li>Click the page number at the bottom of the table to view other events</li>
                        </ol>
                    </td>
                    <td>Page number button will only show current page-4 to current page+4 and first page and last page</td>
                </tr>
                <tr>
                    <td>Sort Events</td>
                    <td>
                        <ol>
                            <li>Click table header's column to select sort by which field</li>
                            <li>Click the same column again will sort in descending order</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Search Events</td>
                    <td>
                        <ol>
                            <li>Click the drop-down list next to search bar to select searching on which field</li>
                            <li>Input keywords in the search bar and click search button</li>
                            <li>Result will show on the event table</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Event Detail</td>
                    <td>
                        <ol>
                            <li>Click one of the event on the event table</li>
                            <li>the selected event detail will be showed</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Create Event</td>
                    <td>
                        <ol>
                            <li>Click Create Event button</li>
                            <li>Input all the field in the form and click submit</li>
                            <li>Alert show success/failure</li>
                            <li>Back to event table automatically</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Edit Event</td>
                    <td>
                        <ol>
                            <li>Enter the selected event detail page</li>
                            <li>Click Edit Event button</li>
                            <li>Input edit value on corresponding field in the form and click submit</li>
                            <li>Alert show success/failure</li>
                            <li>Back the selected event detail page with updated infomation automatically</li>
                        </ol>
                    </td>
                    <td>The form will show the current infomation as placeholder in each input field. If user input nothing on the input field. The infomation on that field will not change</td>
                </tr>
                <tr>
                    <td>Delete Event</td>
                    <td>
                        <ol>
                            <li>Enter the selected event detail page</li>
                            <li>Click Delete Event button</li>
                            <li>Alert show success/failure</li>
                            <li>Back to event table automatically</li>
                        </ol>
                    </td>
                    <td>If user press back button in the browser after the event deleted. It will show the event is not exist.<br/>All the comment & favourite related to the event are also deleted from database</td>
                </tr>
                <tr>
                    <td>Reload Event</td>
                    <td>
                        <ol>
                            <li>Click Reload Event button</li>
                            <li>Wait some seconds</li>
                            <li>Click Event on nav bar will load the event table</li>
                        </ol>
                    </td>
                    <td>Reload event will only create the deleted event which is in the Gov Data API. All the modified/user-created events have no effect in this function</td>
                </tr>
                <tr>
                    <td>Comment</td>
                    <td>
                        <ol>
                            <li>Enter the selected event detail page</li>
                            <li>Input all the field in the comment form(including color select) and click Add Comment</li>
                            <li>New comment automatically shown</li>
                        </ol>
                    </td>
                    <td>If user leaves any input field in the comment form blank, the Add Comment button will not work</td>
                </tr>
                <tr>
                    <td>Add Favourite</td>
                    <td>
                        <ol>
                            <li>In event table, click the + button to add the event to favourite</li>
                            <li>alert show success/failure</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>View Favourite</td>
                    <td>
                        <ol>
                            <li>Click the Favourite button on the nav bar</li>
                            <li>Show login user's favourite events</li>
                        </ol>
                    </td>
                    <td>User can click the event in the favourite event table to enter event detail page</td>
                </tr>
                <tr>
                    <td>Remove Favourite</td>
                    <td>
                        <ol>
                            <li>Enter favourite page</li>
                            <li>Click the - button on the table to remove that event in favourite</li>
                            <li>Alert show success/failure</li>
                        </ol>
                    </td>
                    <td></td>
                </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

class DatabaseDesign extends React.Component {
    render(){
        return(
            <div className="container-fluid">
                <h3>Database Design</h3>
                <img src="database.png" className="img-fluid" alt="Database"/>
                <table className='table table-striped'>
                <thead>
                <tr>
                    <th>Collection</th>
                    <th>Schema</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>users</td>
                    <td>
                        <ol>
                            <li>username: type: String, required: true, unique: true</li>
                            <li>password: type: String, required: true</li>
                        </ol>
                    </td>
                    <td>
                        <ol>
                            <li>store username</li>
                            <li>store bcryptjs encrypted password</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                    <td>hkevents</td>
                    <td>
                        <ol>
                            <li>event_id: type: Number, required: true, unique: true</li>
                            <li>event_summary: type: String, required: true</li>
                            <li>event_desc: type: String</li>
                            <li>event_date: type: String</li>
                            <li>event_org: type: String</li>
                            <li>event_location: type: String</li>
                            <li>event_url: type: String</li>
                        </ol>
                    </td>
                    <td>
                        <ol>
                            <li>store event ID</li>
                            <li>store title of the event</li>
                            <li>store the description of the event</li>
                            <li>store the date of the event</li>
                            <li>store the organization of the event</li>
                            <li>store event location</li>
                            <li>store event url if any</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                    <td>favourites</td>
                    <td>
                        <ol>
                            <li>user: type: mongoose.Schema.Types.ObjectId, ref: 'User'</li>
                            <li>event: type: mongoose.Schema.Types.ObjectId, ref: 'HKEvent'</li>
                        </ol>
                    </td>
                    <td>
                        <ol>
                            <li>store related user object ID</li>
                            <li>store related event object ID</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                    <td>comments</td>
                    <td>
                        <ol>
                            <li>user: type: mongoose.Schema.Types.ObjectId, ref: 'User'</li>
                            <li>event: type: mongoose.Schema.Types.ObjectId, ref: 'HKEvent'</li>
                            <li>header: type: String</li>
                            <li>description: type: String</li>
                            <li>color: type: String</li>
                            <li>position: type: String</li>
                        </ol>
                    </td>
                    <td>
                        <ol>
                            <li>store related user object ID</li>
                            <li>store related event object ID</li>
                            <li>store comment title</li>
                            <li>store comment description</li>
                            <li>store comment svg circle color</li>
                            <li>store comment position in the event</li>
                        </ol>
                    </td>
                </tr>

                </tbody>
                </table>
            </div>
        )
    }
}

class AcademicHonesty extends React.Component {
    render(){
        return(
            <div className="container-fluid">
                <h3>Academic Honesty</h3>
                <p>
                 --- Declaration ---<br/>
                 <br/>
                 We declare that the project here submitted is original except for source<br/>
                 material explicitly acknowledged. We also acknowledge that We are aware of<br/>
                 University policy and regulations on honesty in academic work, and of the<br/>
                 disciplinary guidelines and procedures applicable to breaches of such policy<br/>
                 and regulations, as contained in the website<br/>
                 <a href="http://www.cuhk.edu.hk/policy/academichonesty/">http://www.cuhk.edu.hk/policy/academichonesty/</a>
                </p>
            </div>
        )
    }
}
