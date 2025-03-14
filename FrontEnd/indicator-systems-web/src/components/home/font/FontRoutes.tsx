import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import FontList from "../font/fontList/FontList.tsx";
import FontNew from "../font/fontNew/FontNew.tsx";
import FontEdit from "../font/fontEdit/FontEdit.tsx";

/**
 * font routes
 */
export default function FontRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<FontList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <FontNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <FontEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
