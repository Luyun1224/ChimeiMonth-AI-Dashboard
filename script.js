// ---------------------------------------------------
// 階段三：模組化元件 (資料處理與圖表邏輯)
// ---------------------------------------------------

// ----- 資料來源 (N=61) ----- -> (N=60)
const finalDashboardData = {
    "totalCount": 60,
    "totalExternal": 21,
    "totalInternal": 39,
    "roleKpi": {
        "it": 5,
        "clinical": 24,
        "nonClinical": 31
    },
    "decisionMakerKpi": {
        "decisionMakers": 15, 
        "implementers": 46
    },
    "externalParticipantsList": [
        {"group": "第一組", "unit": "李俊杰診所"},
        {"group": "第一組", "unit": "德幼小兒科"},
        {"group": "第二組", "unit": "大林慈濟醫院院長室醫院發展組"},
        {"group": "第二組", "unit": "復華耳鼻喉科診所"},
        {"group": "第三組", "unit": "高雄榮民總醫院教學研究部"},
        {"group": "第三組", "unit": "晉慶眼科診所"},
        {"group": "第三組", "unit": "歐洲工商管理學院"},
        {"group": "第四組", "unit": "中山大學精準醫學所"},
        {"group": "第四組", "unit": "中山大學精準醫學所"},
        {"group": "第四組", "unit": "黃清相診所"},
        {"group": "第五組", "unit": "高雄醫學大學醫學系"},
        {"group": "第五組", "unit": "高雄醫學大學醫學系"},
        {"group": "第五組", "unit": "正信診所"},
        {"group": "第六組(貓頭鷹)", "unit": "大林慈濟醫院教學部"},
        {"group": "第六組(貓頭鷹)", "unit": "大林慈濟醫院教學部"},
        {"group": "第六組(貓頭鷹)", "unit": "三愛診所"},
        {"group": "第六組(貓頭鷹)", "unit": "國光生物科技股份有限公司"},
        {"group": "第七組(貓頭W鷹)", "unit": "成大醫院受試者保護中心"},
        {"group": "第七組(貓頭鷹)", "unit": "大林慈濟醫院教學部"},
        {"group": "第七組(貓頭鷹)", "unit": "寶建醫院護理部"},
        {"group": "第七組(貓頭鷹)", "unit": "樹德科技大學"}
    ],
    "groupRoleData": {
        "labels": ["第一組", "第二組", "第三組", "第四組", "第五組", "第六組(貓頭鷹)", "第七組(貓頭鷹)"],
        "it": [0, 1, 2, 0, 1, 1, 0],
        "clinical": [6, 4, 0, 4, 1, 4, 5],
        "nonClinical": [3, 4, 6, 4, 6, 4, 4]
    },
    "externalAnalysis": {
        "byType": {
            "醫院": 14,
            "學校": 6,
            "其他": 1
        },
        "byHospitalLevel": {
            "醫學中心": 6,
            "診所": 7,
            "地區醫院": 1
        }
    }
};

// ----- 地理編碼字典 -----
const externalLocations = {
    "奇美醫院": { lat: 23.021, lon: 120.241, name: "奇美醫院", city: "台南市", type: "internal", category: "醫院" },
    "中山大學": { lat: 22.6295, lon: 120.2662, name: "中山大學", city: "高雄市", type: "external", category: "學校" },
    "成大醫院": { lat: 22.9996, lon: 120.2223, name: "成大醫院", city: "台南市", type: "external", category: "醫院" },
    "大林慈濟醫院": { lat: 23.5935, lon: 120.4658, name: "大林慈濟醫院", city: "嘉義縣", type: "external", category: "醫院" },
    "高雄榮民總醫院": { lat: 22.6744, lon: 120.3233, name: "高雄榮民總醫院", city: "高雄市", type: "external", category: "醫院" },
    "寶建醫院": { lat: 22.6808, lon: 120.4850, name: "寶建醫院", city: "屏東縣", type: "external", category: "醫院" },
    "李俊杰診所": { lat: 22.9934, lon: 120.2127, name: "李俊杰診所", city: "台南市", type: "external", category: "診所" },
    "三愛診所": { lat: 23.0033, lon: 120.2163, name: "三愛診所", city: "台南市", type: "external", category: "診所" },
    "德幼小兒科": { lat: 23.0063, lon: 120.2114, name: "德幼小兒科", city: "台南市", type: "external", category: "診所" },
    "復華耳鼻喉科診所": { lat: 23.0090, lon: 120.2274, name: "復華耳鼻喉科診所", city: "台南市", type: "external", category: "診所" },
    "晉慶眼科診所": { lat: 23.0001, lon: 120.2130, name: "晉慶眼科診所", city: "台南市", type: "external", category: "診所" },
    "正信診所": { lat: 23.0232, lon: 120.2241, name: "正信診所", city: "台南市", type: "external", category: "診所" },
    "黃清相診所": { lat: 23.0253, lon: 120.2198, name: "黃清相診所", city: "台南市", type: "external", category: "診所" },
    "高雄醫學大學": { lat: 22.6465, lon: 120.3010, name: "高雄醫學大學", city: "高雄市", type: "external", category: "學校" },
    "國光生物科技": { lat: 24.2154, lon: 120.6022, name: "國光生物科技", city: "台中市", type: "external", category: "其他" },
    "樹德科技大學": { lat: 22.7091, lon: 120.3473, name: "樹德科技大學", city: "高雄市", type: "external", category: "學校" }
    // 歐洲工商管理學院 未編碼 (N=1)
};

// ----- Chart.js 全域設定 -----
// 確保 Chart 和 ChartDataLabels 是可用的 (因為它們是從 HTML <script> 標籤載入的)
// 在
// script.js 中，我們不能直接 import，但可以假設它們存在於 global scope
if (typeof Chart !== 'undefined' && typeof ChartDataLabels !== 'undefined') {
    Chart.defaults.font.family = "'Noto Sans TC', sans-serif";
    Chart.defaults.color = '#1f2937'; 
    Chart.defaults.plugins.legend.position = 'bottom';
    Chart.defaults.plugins.legend.labels.padding = 20;

    // (全新) 註冊 Datalabels 插件
    Chart.register(ChartDataLabels);
}


// ----- DOM 載入後執行 -----
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. 動態更新所有 KPI 數字 ---
    document.getElementById('kpi-total').textContent = finalDashboardData.totalCount;
    document.getElementById('kpi-external').textContent = finalDashboardData.totalExternal;
    document.getElementById('kpi-internal').textContent = finalDashboardData.totalInternal;

    // --- 1. 地理分佈圖 (依據 N=61 全體人員) ---
    // 確保 L (Leaflet) 是可用的
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([23.1, 120.3], 9); 
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // (全新) 定義多種標記（院內、院外醫院、院外診所、院外其他）
        const internalIcon = L.divIcon({
            className: 'morandi-marker-icon-internal', // 品牌藍 (院內)
            iconSize: [20, 20]
        });
        
        const externalHospitalIcon = L.divIcon({
            className: 'morandi-marker-icon-external-hospital', // 琥珀黃 (院外醫院)
            iconSize: [20, 20]
        });
        
        const externalClinicIcon = L.divIcon({
            className: 'morandi-marker-icon-external-clinic', // 青綠色 (院外診所)
            iconSize: [20, 20]
        });
        
        const externalOtherIcon = L.divIcon({
            className: 'morandi-marker-icon-external-other', // 紫色 (院外其他)
            iconSize: [20, 20]
        });

        const locationsToMark = {};
        const cityCounts = {}; 
        let mappedCount = 0;
        const totalParticipants = finalDashboardData.totalCount;
        const totalInternal = finalDashboardData.totalInternal;
        const locationKeys = Object.keys(externalLocations);

        function findLocationInfo(unitString) {
            for (const key of locationKeys) {
                if (unitString.includes(key)) {
                    return externalLocations[key];
                }
            }
            return null;
        }

        finalDashboardData.externalParticipantsList.forEach(person => {
            const locationInfo = findLocationInfo(person.unit);
            
            if (locationInfo) {
                mappedCount++; 
                const geoKey = `${locationInfo.lat},${locationInfo.lon}`;
                if (!locationsToMark[geoKey]) {
                    locationsToMark[geoKey] = { info: locationInfo, count: 0 };
                }
                locationsToMark[geoKey].count++;

                const city = locationInfo.city;
                if (city) {
                    if (!cityCounts[city]) cityCounts[city] = { internal: 0, external: 0 };
                    cityCounts[city].external++;
                }
            }
        });

        const chimeiLocation = externalLocations["奇美醫院"];
        const chimeiGeoKey = `${chimeiLocation.lat},${chimeiLocation.lon}`;
        
        if (!locationsToMark[chimeiGeoKey]) {
            locationsToMark[chimeiGeoKey] = { info: chimeiLocation, count: 0 };
        }
        locationsToMark[chimeiGeoKey].count += totalInternal;

        const chimeiCity = chimeiLocation.city;
        if (!cityCounts[chimeiCity]) cityCounts[chimeiCity] = { internal: 0, external: 0 };
        cityCounts[chimeiCity].internal += totalInternal;

        mappedCount += totalInternal;

        const subtitleEl = document.getElementById('map-subtitle');
        subtitleEl.textContent = `(來源: 全體人員, N=${totalParticipants}, 標記 ${mappedCount}/${totalParticipants} 人)`;

        const cityContainer = document.getElementById('city-counts-container');
        cityContainer.innerHTML = ''; 

        const sortedCities = Object.keys(cityCounts).sort((a, b) => {
            const totalA = (cityCounts[a].internal || 0) + (cityCounts[a].external || 0);
            const totalB = (cityCounts[b].internal || 0) + (cityCounts[b].external || 0);
            return totalB - totalA;
        }); 

        for (const city of sortedCities) {
            const counts = cityCounts[city]; 
            if (city === "台南市") {
                if (counts.internal > 0) {
                    const badge = document.createElement('span');
                    badge.className = 'data-badge';
                    badge.style.backgroundColor = '#003D82'; /* 院內 (品牌藍) */
                    badge.style.color = '#ffffff';
                    badge.textContent = `台南市 (院內) ${counts.internal} 人`;
                    cityContainer.appendChild(badge);
                }
                if (counts.external > 0) {
                    const badge = document.createElement('span');
                    badge.className = 'data-badge';
                    badge.style.backgroundColor = '#FFA500'; /* 院外 (琥珀黃) */
                    badge.style.color = '#1f2937'; /* 深色文字 */
                    badge.textContent = `台南市 (院外) ${counts.external} 人`;
                    cityContainer.appendChild(badge);
                }
            } else {
                const total = (counts.internal || 0) + (counts.external || 0);
                if (total > 0) {
                    const badge = document.createElement('span');
                    badge.className = 'data-badge';
                    badge.style.backgroundColor = '#FFA500'; /* 院外 (琥珀黃) */
                    badge.style.color = '#1f2937'; /* 深色文字 */
                    badge.textContent = `${city} ${total} 人`;
                    cityContainer.appendChild(badge); 
                } 
            }
        } 

        Object.values(locationsToMark).forEach(loc => {
            const popupContent = `
                <div style="font-family: 'Noto Sans TC', sans-serif;">
                    <strong style="font-size: 1.1em;">${loc.info.name}</strong><br>
                    報名人數： ${loc.count} 人
                </div>
            `;
            
            let iconToUse;
            if (loc.info.type === 'internal') {
                iconToUse = internalIcon;
            } else if (loc.info.category === '醫院') {
                iconToUse = externalHospitalIcon;
            } else if (loc.info.category === '診所') {
                iconToUse = externalClinicIcon;
            } else {
                iconToUse = externalOtherIcon;
            }
            
            // (全新) 永久標籤的內容 (僅顯示機構名稱)
            const tooltipContent = loc.info.name;

            L.marker([loc.info.lat, loc.info.lon], { icon: iconToUse })
                .addTo(map)
                .bindPopup(popupContent)
                // (全新) 綁定永久標籤
                .bindTooltip(tooltipContent, {
                    permanent: true,       // 設置為永久顯示
                    direction: 'auto',     // 自動判斷方向
                    offset: [10, 0],       // 往右偏移 10px
                    className: 'location-tooltip' // 套用自訂 CSS
                });
        });
    }

    // --- 2. (全新) 分組長條圖配色 ---
    // 確保 Chart 是可用的
    if (typeof Chart !== 'undefined') {
        const ctxGroup = document.getElementById('groupChart').getContext('2d');
        new Chart(ctxGroup, {
            type: 'bar',
            data: {
                labels: finalDashboardData.groupRoleData.labels,
                datasets: [
                    {
                        label: '資訊',
                        data: finalDashboardData.groupRoleData.it,
                        backgroundColor: '#003D82', // 院內 (品牌藍)
                    },
                    {
                        label: '臨床',
                        data: finalDashboardData.groupRoleData.clinical,
                        backgroundColor: '#FFA500', // 院外 (琥珀黃)
                    },
                    {
                        label: '非臨床',
                        data: finalDashboardData.groupRoleData.nonClinical,
                        backgroundColor: '#708090', // 中性色 (灰藍)
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                },
                plugins: {
                    datalabels: {
                        formatter: (value) => {
                            return value > 0 ? value : '';
                        },
                        color: '#ffffff',
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        textStrokeColor: 'rgba(0,0,0,0.5)',
                        textStrokeWidth: 2
                    },
                    tooltip: {
                        callbacks: {
                            footer: function(tooltipItems) {
                                let sum = 0;
                                tooltipItems.forEach(function(tooltipItem) {
                                    sum += tooltipItem.parsed.y;
                                });
                                return '本組總計: ' + sum + ' 人';
                            }
                        }
                    }
                }
            }
        });

        // --- 3. (全新) 全體人員背景分析圖配色 ---
        const ctxCombined = document.getElementById('combinedAnalysisChart').getContext('2d');
        new Chart(ctxCombined, {
            type: 'doughnut',
            data: {
                labels: ['醫學中心 (院內)', '醫學中心 (院外)', '診所 (院外)', '地區醫院 (院外)', '學校 (院外)', '其他 (院外)'],
                datasets: [{
                    label: '背景分析',
                    data: [
                        finalDashboardData.totalInternal, // 院內 (40)
                        finalDashboardData.externalAnalysis.byHospitalLevel.醫學中心, // 院外 (6)
                        finalDashboardData.externalAnalysis.byHospitalLevel.診所, // 院外 (7)
                        finalDashboardData.externalAnalysis.byHospitalLevel.地區醫院, // 院外 (1)
                        finalDashboardData.externalAnalysis.byType.學校, // 院外 (6)
                        finalDashboardData.externalAnalysis.byType.其他 // 院外 (1)
                    ],
                    // (全新) 冷暖色分離
                    backgroundColor: [
                        '#003D82', // 冷色 (院內)
                        '#FFA500', // 暖色 1 (琥珀)
                        '#FFB84D', // 暖色 2
                        '#FFCC99', // 暖色 3
                        '#FFD9B3', // 暖色 4
                        '#FFE6CC'  // 暖色 5
                    ],
                    borderColor: '#FFFFFF',
                    borderWidth: 4,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    // (全新) Datalabels 插件設定
                    datalabels: {
                        formatter: (value, ctx) => {
                            const dataset = ctx.chart.data.datasets[0];
                            // 計算總和
                            const total = dataset.data.reduce((acc, data) => acc + data, 0);
                            // 計算百分比
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            return percentage;
                        },
                        color: (context) => {
                            // 為了易讀性，在亮黃色區塊上用深色文字
                            const bgColor = context.dataset.backgroundColor[context.dataIndex];
                            return (bgColor === '#FFB84D' || bgColor === '#FFCC99') ? '#1f2937' : '#ffffff';
                        },
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        // 加上一點點深色外框，讓白色文字更清晰
                        textStrokeColor: 'rgba(0,0,0,0.3)',
                        textStrokeWidth: 2
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    const total = context.chart.getDatasetMeta(0).total;
                                    const value = context.parsed;
                                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                                    label += `${value} 人 (${percentage})`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

});
