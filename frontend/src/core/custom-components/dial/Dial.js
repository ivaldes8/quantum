import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    Box,
    SpeedDial,
    SpeedDialAction
} from "@mui/material";

import { Build, Group, Home } from "@mui/icons-material";

const Dial = () => {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.auth);

    const actions = [
        { icon: <Group />, name: 'usersManagment', route: "/userAdmin" },
        { icon: <Home />, name: 'homeManagment', route: "/homeAdmin" }
    ];

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: -55, right: 20 }}>
            {user && user.role === 'Admin' &&
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'static', bottom: 16, right: 16 }}
                    icon={<Build />}
                    direction="up"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            component={Link}
                            to={action.route}
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={t(action.name)}
                        />
                    ))}
                </SpeedDial>
            }
        </Box>
    )
}

export default Dial