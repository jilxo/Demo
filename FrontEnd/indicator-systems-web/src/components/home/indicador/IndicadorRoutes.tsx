import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import IndicadorList from "./indicadorList/IndicadorList.tsx";
import IndicadorNew from "./indicadorNew/IndicadorNew.tsx";
import IndicadorEdit from "./indicadorEdit/IndicadorEdit.tsx";


export default function IndicadorRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<IndicadorList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <IndicadorNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <IndicadorEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
