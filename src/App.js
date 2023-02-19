import Users from "./components/Users";
import SearchStatus from "./components/SearchStatus";
import {useState} from "react";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll())
    return (
    <div>
        { users && <Users users={users} setUsers={setUsers} /> }
    </div>
  );
}

export default App;
