import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import FrecuenciaList from "../frecuencia/frecuenciaList/FrecuenciaList.tsx";
import FrecuenciaNew from "../frecuencia/frecuenciaNew/FrecuenciaNew.tsx";
import FrecuenciaEdit from "../frecuencia/frecuenciaEdit/FrecuenciaEdit.tsx";

/**
 * frecuencia routes
 */
export default function FrecuenciaRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<FrecuenciaList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <FrecuenciaNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <FrecuenciaEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
