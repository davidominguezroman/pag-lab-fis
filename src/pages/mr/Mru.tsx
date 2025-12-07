import Layout from "@/components/Layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {  useState } from "react";
import {

  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, FileSpreadsheet } from "lucide-react";
import Plot from 'react-plotly.js';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from "ag-grid-community"; // or themeBalham, themeAlpine
import { exportToExcel } from "@/lib/exportToExcel";

interface ChartTrace {
    x: number[];
    y: number[];
    type: 'scatter';
    mode: 'lines+markers' | 'markers' | 'lines' | 'text' | 'none' | 'text+markers' | 'text+lines' | 'text+lines+markers';
    marker?: { color: string };
    line?: { color: string };
    name: string;
    showlegend: boolean;
}

// Movimiento Rectilíneo Uniforme (MRU)
const Mru = () => {
    let tiempo: number[] = [];
    let posicion: number[] = [];
    const posicionTeorica: number[] = [];
    const [velocidad, setVelocidad] = useState<number>(27);
    const [masa, setMasa] = useState<number>(3);
    const [xIni, setXIni] = useState<number>(0);
    const [tTray, setTTray] = useState<number>(30);
    const [N, setN] = useState<number>(5);
    const [chartData, setChartData] = useState<ChartTrace[]>([{
                        x: tiempo,
                        y: posicion,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                        name: 'Posición medida',
                        showlegend: true,
                    }])

    const [data, setData] = useState<{ tiempo: number, posicionMedida: number, posicionTeorica: number }[]>([]);
    
    const [colDefs, setColDefs] = useState<{ field: "tiempo" | "posicionMedida" | "posicionTeorica" }[]>([
        { field: "tiempo" },
        { field: "posicionMedida" },
        { field: "posicionTeorica" },
        ])
        const myTheme = themeQuartz.withParams({
            /* Low spacing = very compact */
            spacing: 2,
            /* Changes the colour of the grid text */
            foregroundColor: 'rgb(14, 68, 145)',
            /* Changes the colour of the grid background */
            backgroundColor: 'rgb(241, 247, 255)',
            /* Changes the header colour of the top row */
            headerBackgroundColor: 'rgb(228, 237, 250)',
            /* Changes the hover colour of the row*/
            rowHoverColor: 'rgb(216, 226, 255)',
        });
    function trayectoria() {
        //if(velocidad !== undefined && masa !== undefined && xIni !== undefined && tTray !== undefined && N !== undefined && masa > 0 && tTray > 0 && 0 < N && N > 100) {
        console.log(velocidad);
        console.log(masa);
        console.log(xIni);
        console.log(tTray);
        setData([]);
        posicion = [];
        tiempo = [];
        for (let i = 0; i < N; i++) {
            const t = tTray * i / (N-1);
            const xTeo = xIni + velocidad * t;
            const x = xTeo + (Math.random() * 0.05 * xTeo);
            posicionTeorica.push(Number(xTeo.toFixed(2)));
            posicion.push(Number(x.toFixed(2)));
            tiempo.push(Number(t.toFixed(2)));
        }
        const newData: { tiempo: number, posicionMedida: number, posicionTeorica: number }[] = []
        for (let i = 0; i< N; i++) {
            newData.push({ "tiempo": tiempo[i], "posicionMedida": posicion[i], "posicionTeorica": posicionTeorica[i] });
        }
        setData(newData)
        console.log(posicion);
        console.log(posicionTeorica);
        setChartData([
                    {
                        x: tiempo,
                        y: posicion,
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: 'red'},
                        name: 'Posición medida',
                        showlegend: true,
                    },
                    {
                        x: tiempo,
                        y: posicionTeorica,
                        type: 'scatter',
                        mode: 'lines',
                        line: { color: 'blue' },
                        name: 'Posición teórica',
                        showlegend: true,
                    }
                ])
        setColDefs([
        { field: "tiempo" as const },
        { field: "posicionMedida" as const },
        { field: "posicionTeorica" as const },
        ])
        
    }



    return(
        <>
            <Layout>
                <h1 style={{ textAlign: "center" }}>MRU</h1>
                <Alert >
                <AlertTitle>Atención!</AlertTitle>
                <AlertDescription>
                    Recuerda que no funcionará si: 
                    <ul>
                        <li>La masa es menor o igual que cero</li>
                        <li>El tiempo es menor o igual que cero</li>
                        <li>El número de cálculos es menor o igual que cero</li>
                        <li>El número de cálculos es mayor que 100</li>
                    </ul>
                </AlertDescription>
                </Alert>
                <br></br>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 320px', maxWidth: '48%' }}>
                        <table>
                            <TableRow>
                                <Label>Velocidad(m/s): </Label>
                                <Input style={{ width: "150px" }}  placeholder="Velocidad" value={velocidad} onChange={e => setVelocidad(Number(e.target.value))} />
                                <Label>Masa(kg): </Label>
                                <Input style={{ width: "150px" }}  placeholder="Masa" value={masa} onChange={e => setMasa(Number(e.target.value))}/>
                            </TableRow>
                            <TableRow>
                                <Label>Posición Inicial(m):</Label>
                                <Input style={{ width: "150px" }}  placeholder="Posición Inicial" value={xIni} onChange={e => setXIni(Number(e.target.value))}/>
                                <Label>Tiempo del Recorrido(s): </Label>
                                <Input style={{ width: "150px" }}  placeholder="Tiempo" value={tTray} onChange={e => setTTray(Number(e.target.value))}/>
                            </TableRow>
                            <TableRow>
                                <Label>Número de Cálculos: </Label>
                                <Input style={{ width: "150px" }}  placeholder="Número de Cálculos" value={N} onChange={e => setN(Number(e.target.value))}/>
                            </TableRow>
                        </table>
                        <div style={{ marginTop: 12 }}>
                            <Button 
                                onClick={trayectoria}
                                disabled={masa <= 0 || N <= 0 || N > 100 || tTray <= 0}
                            >
                                <Rocket className="mr-2 h-4 w-4" />
                                Calcular Trayectoria
                            </Button>
                            <Button 
                                onClick={() => {
                                    const now = new Date();
                                    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
                                    exportToExcel({ 
                                        data: data.map(row => ({
                                            'Tiempo (s)': row.tiempo,
                                            'Posición Medida (m)': row.posicionMedida,
                                            'Posición Teórica (m)': row.posicionTeorica
                                        })),
                                        fileName: `datos-mru-${timestamp}`,
                                        sheetName: 'Resultados MRU'
                                    })
                                }}
                                variant="outline"
                                disabled={data.length === 0}
                                style={{ marginLeft: 8 }}
                            >
                                <FileSpreadsheet className="mr-2 h-4 w-4" />
                                Exportar a Excel
                            </Button>
                        </div>
                    </div>

                    <div style={{ height: 500,width: 600 }} className="ag-theme-quartz">
                        <AgGridReact
                        theme={myTheme}
                        rowData={data}
                        columnDefs={colDefs}
                    />
                    </div>
                </div>
              
                <br></br>
                
            <div style={{
                                borderRadius: 12,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                                overflow: 'hidden',
                                display: 'block',
                                width: 1440,
                                margin: '0 auto'
                            }}>
                <Plot
                    data={chartData}
                    layout={{
                        width: 1440,
                        height: 1080,
                        title: { text: 'Posición en función del tiempo' },
                        paper_bgcolor: '#FFFFFF',
                        plot_bgcolor: '#FFFFFF',
                        font: { color: 'black' },
                        margin: { t: 60, b: 60, l: 60, r: 60 },
                        xaxis: {
                            title: { text: 'Tiempo (s)' },
                            gridcolor: '#222', // even more muted gray
                            gridwidth: 0.3,
                            linecolor: 'grey',
                            tickcolor: 'grey',
                            tickfont: { color: 'grey' },
                            color: 'grey', // Force axis line and label color
                        },
                        yaxis: {
                            title: { text: 'Posición (m)' },
                            gridcolor: '#222', // even more muted gray
                            gridwidth: 0.3,
                            linecolor: 'grey',
                            tickcolor: 'grey',
                            tickfont: { color: 'grey' },
                            color: 'grey', // Force axis line and label color
                        },
                    }}
                    
                    
                />
            </div>
            </Layout>
        </>
    );    
}

export default Mru;