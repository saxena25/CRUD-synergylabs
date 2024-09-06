import axios from 'axios';
import {useState,useEffect} from "react";
import Loader from './components/Loader';
import Error from './components/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
        


function App() {
  const[data,setData] = useState([]);//Store all the data of api in the array
  const[loader,setLoader] = useState(false)//for loading page
  const[error,setError] = useState(false);//for error page
  const[toggle,setToggle] = useState(true);
  const[newUser,setNewUser] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const[selectedUserID,setSelectedUserID] = useState(null);


  let URL = "https://jsonplaceholder.typicode.com/users";


  const DisplayData = async() =>{
    setLoader(true);

      try {
        let res = await axios.get(URL)//making get request by using axios
        setData(res.data);
        setLoader(false);
        // console.log(res.data);
      } catch (error) {
        console.log(`error while Fetch ${error}`); 
        setLoader(false);
        setError(true)  
      }
  }

  const createUser = async(e) =>{
    e.preventDefault();
    setLoader(true)
    try {
      let res = await axios.post(URL,newUser);
      console.log(res.data);
      setLoader(false)
      // setData([...data, res.data])//here send order data and new data in setData array
      setNewUser({name: "",email: "",phone: ""})
      alert("User Created Successfully! \n Check Console for Output");
    } catch (error) {
      console.log(`error while Creating user ${error}`);
      setLoader(false)
      setError(true)
    }
  }

  const editUser = async(e) =>{
    e.preventDefault();
    setLoader(true);
    try {
      let res = await axios.put(URL+`/${selectedUserID}`,newUser);
      console.log(res.data);
      // setData(data.map((user)=>user.id === selectedUserID ? res.data : user))//here running map on data to user.id is equal to selectedUserId send res.data else send user
      setNewUser({
        name: '',
        email: "",
        phone: ""
      })
      setLoader(false);
      alert("User Updated Successfully \n Check console for Output")
    } catch (error) {
      console.log(`error while Editing user ${error}`);
      setLoader(false)
      setError(true)
    }
  }

  const handleEditUser = (user) =>{
    setSelectedUserID(user.id)
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone 
    })
    setToggle(false)
  }

  const handleDelete = async(id) =>{
    setLoader(true)
    try {
      let res = await axios.delete(`${URL}/${id}`);
      // setData(data.filter((user)=>user.id != id));//this will show all the users excepts deleted one
      console.log('User Deleted');
      setLoader(false);
      alert('user delete successfully');
    } catch (error) {
      console.log(`error while Deleting user ${error}`);
      setLoader(false);
      setError(true);
    }
  }

  //useEffect for controlling lifecycle events
  useEffect(() => {
    DisplayData();//for mounting phase
    const cleanUp = () =>{//cleanup function for unmounting phase
      DisplayData();
    }
    return cleanUp;
  }, []);

  if (loader) {//if loader is true will show loading screen
    // console.log("loader is running");
    return <Loader />
  }

  if (error) {//if error occurs show error page
    // console.log("error is running");
    return <Error />
  }

  return (
    <div className='wrapper'>
      <h1 className='app-header'>USERS LIST..</h1>

      <div className='form-wrapper'>
        {/* <div className='toggle-wrapper'>
          <p>Click Below Button to Create User or Edit User</p>
          <button type="button" className="btn btn-outline-info toggle-btn" onClick={()=>setToggle(!toggle)}>{toggle ? "Create User" : "Edit User"}</button>
        </div> */}
        <h3 className='create-user-header'><b>{toggle ? "Create User" : "Edit User"}</b></h3>
        <form className='user-form' onSubmit={toggle ? createUser : editUser}>
          <label htmlFor="name">
            Name: <input type="text" name="name" className="name" placeholder='Enter Your Name' value={newUser.name}
                  onChange={(e)=>setNewUser({...newUser,name: e.target.value})} />
          </label>
          <label htmlFor="email">
            Email: <input type="email" name="email" className="email" placeholder='Enter Your Email' value={newUser.email}
                    onChange={(e)=>setNewUser({...newUser,email: e.target.value})}/>
          </label>
          <label htmlFor="number">
            Phone No: <input type="number" name="number" className="number" placeholder='Enter Phone' value={newUser.phone}
                      onChange={(e)=>setNewUser({...newUser, phone: e.target.value})}/>
          </label>
          {/* <input type="submit" value="Save" className='submit-btn' /> */}
          <button type="submit" className="btn btn-outline-secondary">Save</button>
        </form>
      </div>

      <div className='users-wrapper'>
        {
          data.map((user)=>(
            <div key={user.id} className='cards'>
              <p>ID: {user.id}</p>
              <p>Name: <b>{user.name}</b></p>
              <p>Email: {user.email}</p>
              <p>Address: {user.address.city}</p>
              <button className="btn btn-outline-info edit-btn" onClick={()=>handleEditUser(user)}>Edit</button>
              <button className="btn btn-outline-danger delete-btn" onClick={()=>handleDelete(user.id)}>Delete</button>
              {/* <button>Delete</button> */}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
