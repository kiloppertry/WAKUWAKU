import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart,CandleStickChart } from "./config/api";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { Chart as GoogleChart } from "react-google-charts";

import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "./config/data";
import { CryptoState } from "../CryptoContext";
Chart.register(...registerables);
  
//!本组件画单币右侧图

const CoinInfo = ({ coin }) => {
  //单价格数据
  const [historicData, setHistoricData] = useState();
  const [oHistoricData, setOHistoricData] = useState();
  //想要调阅的天数
  const [days, setDays] = useState(1);
  const [oDays, setODays] = useState(30);
  const { currency } = CryptoState();
  const [flag,setFlag] = useState(false);
  const [oFlag,setOFlag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };
  //!K
  const fetchOHistoricData = async () => {
    const { data } = await axios.get(CandleStickChart(coin.id, oDays, currency));
    setOFlag(true);
    console.log("OHistoricData原始",data);
    setOHistoricData([['DATE','OPEN','HIGH','LOW','CLOSE'],...data.map((item) => {
      return [
        new Date(item[0]),
        parseFloat(item[1]),
        parseFloat(item[2]),
        parseFloat(item[3]),
        parseFloat(item[4]),
      ]
      }
      )]
      );
  };
  useEffect(() => {
    fetchHistoricData();
    fetchOHistoricData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
console.log('oHistoricData',oHistoricData);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | flag===false |!oHistoricData | oFlag===false ? (
          // CircularProgress 环形进度条显示
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            {/* 都在Line这个大标签内书写玩 */}
            <Line
            //!准备数据的写法 学一下 data里有横坐标数据lables和纵坐标内容数据datasets
              data={{
                // lables就是横轴日期显示的内容
                labels: historicData.map((coin) => {
                  // 本身是16位数字时间戳 [1650380443195,19431.571796991004]数据结构
                  let date = new Date(coin[0]);
                  let time =
                  //在时间x轴上区别显示AM和PM如果是小于12则显示AM，如果是12则显示PM,如果days等于1就直接是日期
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                
                datasets: [
                  {
                    //用map函数遍历出第二个参数，即价格数组,传给data属性
                    data: historicData.map((coin) => coin[1]),
                    //设定标签栏内容:
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}

              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {/* 封装备选周期,封装选择卡,这里选择周期,并用遍历,原来选择周期是遍历打印按钮,给按钮封装 */}
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setFlag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
            <GoogleChart
            chartType="CandlestickChart"
            width="100%"
            height="400px"
            data={oHistoricData}
            options={{
              legend:'none',
              backgroundColor:'transparent',
              candlestick:{hollowIsRising:true},
              chartArea:{left:30,top:30,bottom:50,width:'100%',height:'100%'},
              colors:[ "#EEBC1D",'grey'],
              vAxis:{gridlines:{color:'transparent'}},
              hAxis:{gridlines:{color:'transparent'}},
            }}
            />


            
            
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
