              borderColor: "#FF4842",
            },
          }}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 320, mx: -3 }}>
              borderColor: "#E5E7EB",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FF4842",
            },
          }}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 320, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(145, 158, 171, 0.2)"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 11 }}
              dx={-10}
              tickFormatter={getYAxisTickFormatter}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF4842"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#FF4842",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 6,
                fill: "#FF4842",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <Box
      sx={{
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(145, 158, 171, 0.2)"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 11 }}
              dx={-10}
              tickFormatter={getYAxisTickFormatter}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF4842"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: "#FF4842",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{
                r: 6,
                fill: "#FF4842",
                strokeWidth: 2,
                stroke: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
        bgcolor: "#fff",
        p: "8px 12px",
        boxShadow:
          "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
        borderRadius: "8px",
        border: "1px solid #F2F4F7",
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#111827",
          mb: 0.25,
        }}
      >
        {`$${payload[0].value}`}
      </Typography>
      <Typography
        sx={{
          fontSize: "11px",
          color: "#6B7280",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    })
  ),
  label: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
  label: "",
};

export default RevenueChart;
