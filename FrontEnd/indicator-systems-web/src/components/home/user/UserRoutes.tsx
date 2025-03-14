import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import UserList from "./userList/UserList.tsx";
import UserNew from "./userNew/UserNew.tsx";
import UserEdit from "./userEdit/UserEdit.tsx";


export default function UserRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<UserList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <UserNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <UserEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
