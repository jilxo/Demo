import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import DecreeList from "./actorTypeList/DecreeList.tsx";

/**
 * decree routes
 */
export default function DecreeRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<DecreeList/>}/>
                    </Suspense>
                }
            />
        </Routes>
    );
}
