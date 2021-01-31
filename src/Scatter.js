import React, { PureComponent } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label
} from 'recharts';

function getDomain(key) {
    if (key === "price") {
        return [dataMin => (Math.floor(dataMin / 20) * 20),
            dataMax => (Math.ceil((dataMax+1) / 20) * 20)];
    }
    else if (key == "rating") {
        return [0, 5];
    }
    else {
        return [0, "dataMax"];
    }
}

function getTicks(key) {
    if (key === "rating") {
        return [...Array(6).keys()];
    }
    return [];
}

export default function MyScatter(data, xkey, ykey, xlabel, ylabel) {
    return (
        <ScatterChart
        width={350}
        height={350}
        margin={{
            top: 20, right: 20, bottom: 20, left: 20,
        }}
        >
        <CartesianGrid />
        <XAxis type="number" dataKey={xkey} ticks={getTicks(xkey)}
        domain={getDomain(xkey)} scale="auto">
            <Label value={xlabel} offset={0} position="bottom" />
        </XAxis>
        <YAxis type="number" dataKey={ykey} ticks={getTicks(ykey)}
        domain={getDomain(ykey)} interval={0} scale="linear">
            <Label value={ylabel} offset={0} angle={-90} position="left" />
        </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#c62828" fillOpacity={.5}  isAnimationActive={true}/>
        </ScatterChart>
    );
}
