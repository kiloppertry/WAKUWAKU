import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@material-ui/core";
  import {
    createTheme,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  import { useNavigate } from "react-router-dom";
  //从下拉表中拿到切换中美币的计算动作
  import { CryptoState } from "../CryptoContext";
  import React from "react";

  const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  function Header() {
    const classes = useStyles();
    const { currency, setCurrency } = CryptoState();
  
    const history = useNavigate();
  
    return (
        //定义主题颜色
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>

            <Toolbar>
                {/* webray标题样式及 点击回首页效果 */}
              <Typography
                onClick={() => history(`/`)}
                variant="h6"
                className={classes.title}
              >
                WE₿RAY
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
              {/* 选择结算货币选项,并添加点击动作函数,实现动作setCurrency */}
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"CNY"}>CNY</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"JPY"}>JPY</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;
  