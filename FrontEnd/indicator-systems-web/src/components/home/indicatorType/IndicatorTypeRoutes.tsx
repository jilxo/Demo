import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import IndicatorTypeList from "../indicatorType/indicatorTypeList/IndicatorTypeList.tsx";
import IndicatorTypeNew from "../indicatorType/indicatorTypeNew/IndicatorTypeNew.tsx";
import IndicatorTypeEdit from "../indicatorType/indicatorTypeEdit/IndicatorTypeEdit.tsx";

/**
 * indicatorType routes
 */
export default function IndicatorTypeRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<IndicatorTypeList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <IndicatorTypeNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <IndicatorTypeEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
