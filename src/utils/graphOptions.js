
const casesOptions = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Data Display"
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Cases'
        },
        ticks: {
          suggestedMin: -2,
          suggestedMax: 5
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }

}

const deathsOptions = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Data Display"
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Deaths'
        },
        ticks: {
          suggestedMin: -2,
          suggestedMax: 5
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }

}

const testsOptions = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Data Display"
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Tests'
        },
        ticks: {
          suggestedMin: -2,
          suggestedMax: 5
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }

}

export { casesOptions, testsOptions, deathsOptions};