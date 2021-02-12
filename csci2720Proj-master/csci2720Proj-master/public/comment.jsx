// Name: Yung King Fung SID:1155112412
// Name: Tsang Ka Hung SID:1155112415
// Name: Yu Ka Wai SID:1155125476
class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.processForm = this.processForm.bind(this);
        console.log(this.props);
    }
    processForm(){
        var li = document.createElement("li");
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var div = document.createElement("div");
        var h5 = document.createElement("h5");
        var h6 = document.createElement("h6");
        var p = document.createElement("p");

        li.classList.add("media");
        div.classList.add("media-body");
        h5.innerHTML = document.querySelector("#sub").value;
        h6.innerHTML = sessionStorage.getItem('username');
        p.innerHTML = document.querySelector("#comment").value;
        svg.setAttribute("height", "100");
        svg.setAttribute("width", "100");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "40");
        circle.setAttribute("fill", document.querySelector("input[name=color]:checked").value);

        div.appendChild(h5);
        div.appendChild(h6);
        div.appendChild(p);
        svg.appendChild(circle);
        li.appendChild(svg);
        li.appendChild(div);

        var id = "";
        id = document.querySelector("#comments").childNodes.length;
        li.setAttribute("id", id);
        document.querySelector("#comments").appendChild(li);
        document.querySelectorAll("form")[0].reset();

        var object = {
            subject: h5.innerHTML,
            name: sessionStorage.getItem('username'),
            comment: p.innerHTML,
            color: circle.getAttribute("fill"),
            id: id ,
        }
        object = JSON.stringify(object);
        console.log(object);

        $.ajax({
          url: "http://csci2720-g11.cse.cuhk.edu.hk/api/comment/" + this.props.eventid,
          type: "POST",
          data: object,
          contentType: 'application/json',
          dataType: 'text'
      }).done(function(res) {
      });
    }

    render(){
        return(
            <>
            <h2>Add Comment</h2>
            <form className="commentForm flex-sm-row" action="index.html" method="post" id="commentform">

            <div className="form-group">
              <label htmlFor="sub">Subject:</label>
              <input type="text" className="form-control" id="sub"/>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Comment:</label>
              <textarea name="name" rows="8" cols="80" className="form-control" id="comment"></textarea>
            </div>

            Color:
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="color" value="red"/>Red
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="color" value="yellow"/>Yellow
              </label>
            </div><div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="color" value="green"/>Green
              </label>
            </div><div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="color" value="blue"/>Blue
              </label>
            </div>

            <button type="button" name="button" className="btn btn-outline-success" onClick={this.processForm}>Add Comment</button>

            </form>
            </>
        )
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //auto load comments from file
        // console.log("in loadComment " + this.props.eventid);
        $.ajax({
          url: "http://csci2720-g11.cse.cuhk.edu.hk/api/comment/" + this.props.eventid,
          type: "GET",
          contentType: 'application/json',
          dataType: 'text'
        }).done(function(txt) {
          $("#comments").empty();
          var text = JSON.parse(txt);
          loadJSON(text);
        });
    }

    render(){
        return(
            <div className="container m-5">
            <ul id="comments" className="list-unstyled">
            </ul>
            </div>
        )
    }
}

function loadJSON($text) {
    // console.log("loadJSON");
	for (var i = 0; i < $text.length; i++) {
		let $new = $("<li><svg><circle></circle></svg><div><h5></h5><h6></h6><p></p><div></li>");
	  	$new.addClass("media");
		$new.attr("id", $text[i].id);
		$new.find("div").addClass("media-body");
		$new.find("h5").html($text[i].subject);
		$new.find("h6").html($text[i].name);
		$new.find("p").html($text[i].comment);
		$new.find("svg").attr({
			"height": 100,
			"width": 100
		});
		$new.find("circle").attr({
			"cx": 50,
			"cy": 50,
			"r": 40,
			"fill": $text[i].color
		});

		let $commentID = $text[i].id.split("-");
		if ($commentID.length == 1) {
			$("#comments").append($new);
		}else{
			let $commentPos = $("#comments");
			let $currID = $commentID[0];
			for (let $i = 0; $i < $commentID.length; $i++) {
				if ($i != $commentID.length-1) {
					if ($i == 0) {
						$commentPos = $commentPos.children("#"+$currID).children(".media-body");
					}else{
						$currID = $currID + "-" + $commentID[$i];
						$commentPos = $commentPos.children("ul").children("#"+ $currID).children(".media-body");
					}
				}else{
					if ($commentPos.children("ul").length == 0) {
						let $newList = $("<ul></ul>");
						$newList.addClass("list-unstyled");
						$commentPos.append($newList);
					}
					$commentPos.children("ul").append($new);
				}
			}
		}

	}
}
