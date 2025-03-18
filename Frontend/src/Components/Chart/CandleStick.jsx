import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useParams } from "react-router-dom";

const CandleStick = () => {
    const {symbol}=useParams();
    const handle = useFullScreenHandle();
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(()=>{
        console.log(symbol,"oooooooooooooooooooo")
    },[])
    const [state] = useState({
        series: [{
            data: [
                { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
                { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
                { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
                { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] },
                { x: new Date(1538785800000), y: [6638.24, 6640, 6620, 6624.47] },
            ]
        }],
        options: {
            chart: {
                type: "candlestick",
                height: "100%",
                background: "#0F172A",
                toolbar: {
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                        customIcons: [{
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
                            title: "Fullscreen",
                            class: "fullscreen-btn",
                            click: function() {
                                handle.enter();
                                setIsFullscreen(true);
                            }
                        }]
                    }
                }
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: "#22C55E",
                        downward: "#EF4444"
                    },
                    wick: {
                        useFillColor: true
                    }
                }
            },
            annotations: {
                tools: {
                    line: {
                        enabled: true,
                        borderColor: '#3B82F6',
                        borderWidth: 2
                    },
                    rect: {
                        enabled: true,
                        borderColor: '#8B5CF6',
                        borderWidth: 2
                    }
                }
            },
            title: {
                text: "BTC/USD Price Chart",
                align: "left",
                style: { 
                    color: "#E2E8F0", 
                    fontSize: "24px",
                    fontWeight: "bold"
                }
            },
            xaxis: {
                type: "datetime",
                labels: { 
                    style: { colors: "#94A3B8" },
                    datetimeUTC: false,
                    formatter: function(value) {
                        return new Date(value).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        });
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#334155'
                }
            },
            yaxis: {
                tooltip: { enabled: true },
                labels: { 
                    style: { colors: "#94A3B8" },
                    formatter: (value) => `$${value.toFixed(2)}`
                },
                axisBorder: {
                    show: true,
                    color: '#334155'
                }
            },
            grid: {
                borderColor: "#1E293B",
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true
                    }
                },   
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
                style: {
                    fontSize: '14px'
                },
                x: {
                    formatter: function(val) {
                        return new Date(val).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                        });
                    }
                },
                y: {
                    formatter: function(val) {
                        return `$${val.toFixed(2)}`
                    }
                }
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        height: 400
                    }
                }
            }]
        }
    });

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-slate-900`}>
            <FullScreen handle={handle} onChange={setIsFullscreen}>
                <div className="p-4 h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-200">BTC/USD Trading Chart</h2>
                        <button 
                            onClick={isFullscreen ? handle.exit : handle.enter}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                        >
                            {isFullscreen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                                </svg>
                            )}
                        </button>
                    </div>
                    
                    <ReactApexChart 
                        options={state.options} 
                        series={state.series} 
                        type="candlestick" 
                        height={isFullscreen ? "calc(100vh - 100px)" : 500}
                        width="100%"
                    />
                </div>
            </FullScreen>
        </div>
    );
};

export default CandleStick;