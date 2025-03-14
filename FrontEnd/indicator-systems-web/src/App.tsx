import {Provider} from "react-redux";
import {store} from "./redux/store.tsx";
import {Outlet, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/homepage/HomePage.tsx";
import AboutUs from "./components/homepage/aboutus/AboutUs.tsx";
import SignIn from "./components/signin/SignIn.tsx";
import NoFound from "./components/nofound/NoFound.tsx";
import Home from "./components/home/Home.tsx";
import HomeContent from "./components/homepage/HomeContent.tsx";
import Dashboard from "./components/home/dashboard/Dashboard.tsx";
import DecreeRoutes from "./components/home/decree/DecreeRoutes.tsx";
import RoleRoutes from "./components/home/role/RoleRoutes.tsx";
import UserRoutes from "./components/home/user/UserRoutes.tsx";
import ActorTypeRoutes from "./components/home/actorType/ActorTypeRoutes.tsx";
import ActorRoutes from "./components/home/actor/ActorRoutes.tsx";
import FontRoutes from "./components/home/font/FontRoutes.tsx";
import IndicatorTypeRoutes from "./components/home/indicatorType/IndicatorTypeRoutes.tsx";
import MeasuringUnitRoutes from "./components/home/measuringUnit/MeasuringUnitRoutes.tsx";
import SenseRoutes from "./components/home/sense/SenseRoutes.tsx";
import VisualRepresentationRoutes from "./components/home/visualRepresentation/VisualRepresentationRoutes.tsx";
import IndicadorRoutes from "./components/home/indicador/IndicadorRoutes.tsx";
import VariableRoutes from "./components/home/variable/VariableRoutes.tsx";
import FrecuenciaRoutes from "./components/home/frecuencia/FrecuenciaRoutes.tsx";
import {ThemeProvider} from "@mui/material/styles";
import {useMemo, useState} from "react";
import {darkTheme, lightTheme} from "./theme/customPalette.tsx";


export default function App() {

    const [darkMode, setDarkMode] = useState<"light" | "dark">("light");

    const theme = useMemo(
        () => (darkMode === "light" ? lightTheme : darkTheme),
        [darkMode]
    );

    return (
        <Provider store={store}>
            <ThemeProvider
                theme={theme}>
                <Routes>
                    <Route path="" element={<Outlet />}>
                        <Route path="" element={<HomePage />}>
                            <Route path="" element={<HomeContent />} />
                            <Route path="aboutus" element={<AboutUs />} />
                        </Route>
                        <Route path="app" element={<Home />}>
                            <Route path="" element={<Dashboard />} />
                            <Route path="indicator/*" element={<IndicadorRoutes />} />
                            <Route path="decree/*" element={<DecreeRoutes />} />
                            <Route path="role/*" element={<RoleRoutes />} />
                            <Route path="user/*" element={<UserRoutes />} />
                            <Route path="indicatorType/*" element={<IndicatorTypeRoutes />} />
                            <Route path="actorType/*" element={<ActorTypeRoutes />} />
                            <Route path="actor/*" element={<ActorRoutes />} />
                            <Route path="font/*" element={<FontRoutes />} />
                            <Route path="frecuence/*" element={<FrecuenciaRoutes />} />
                            <Route path="measuringUnit/*" element={<MeasuringUnitRoutes />} />
                            <Route path="sense/*" element={<SenseRoutes />} />
                            <Route path="visualRepresentation/*" element={<VisualRepresentationRoutes />} />
                            <Route path="variable/*" element={<VariableRoutes />} />
                        </Route>
                        <Route path="signin" element={<SignIn />} />
                        <Route path="*" element={<NoFound />} />
                    </Route>
                </Routes>
            </ThemeProvider>

            <ToastContainer></ToastContainer>
        </Provider>
    )
}
