import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import SenseList from "../sense/senseList/SenseList.tsx";
import SenseNew from "../sense/senseNew/SenseNew.tsx";
import SenseEdit from "../sense/senseEdit/SenseEdit.tsx";

/**
 * sense routes
 */
export default function SenseRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<SenseList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <SenseNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <SenseEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
