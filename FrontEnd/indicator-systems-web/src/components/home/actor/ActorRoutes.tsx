import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import ActorList from "../actor/actorList/ActorList.tsx";
import ActorNew from "../actor/actorNew/ActorNew.tsx";
import ActorEdit from "../actor/actorEdit/ActorEdit.tsx";


export default function ActorRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<ActorList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <ActorNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <ActorEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
