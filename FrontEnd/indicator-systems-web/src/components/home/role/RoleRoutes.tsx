import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import RoleList from "../role/roleList/RoleList.tsx";
import RoleNew from "../role/roleNew/RoleNew.tsx";
import RoleEdit from "../role/roleEdit/RoleEdit.tsx";


export default function RoleRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<RoleList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <RoleNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <RoleEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
