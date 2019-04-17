import React, {Component} from 'react';

class AddUser extends Component{
    constructor(props) {
        super(props);
        this.state={
         notice:'',
        };
    }



    submitAddUserForm =(e)=>{
        e.preventDefault();
        fetch('/users/', {
            method: 'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        })
            .then(data=> data.text())
            .then(response=> this.setState({}))
            .catch((error) => console.log(error));
    };
    render(){
        return(
            <div>
                <h1>Add User</h1>
                <form onSubmit={this.submitAddUserForm}>
                    <p>
                        <label htmlFor={"username"}>Enter Username:</label>
                        <input id={"username"} type="text" name='username' placeholder="Enter username" autoFocus/>
                    </p>
                    <label htmlFor={"password"}>Enter Password:</label>
                    <input id={"password"} type="text" name='username' placeholder="Enter username" autoFocus/>
                    <button>Sign In</button>

                </form>
                {this.state.notice}


            </div>

        );
    }
}

export default AddUser;