import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import ActorTypeList from "../actorType/actorTypeList/ActorTypeList.tsx";
import ActorTypeNew from "../actorType/actorTypeNew/ActorTypeNew.tsx";
import ActorTypeEdit from "../actorType/actorTypeEdit/ActorTypeEdit.tsx";


export default function ActorTypeRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<ActorTypeList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <ActorTypeNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <ActorTypeEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
