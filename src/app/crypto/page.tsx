'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface CryptoData {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_vol: number;
    usd_24h_change: number;
  };
}

interface ChartData {
  time: string;
  price: number;
}

const CRYPTOS = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: '₿', color: '#F7931A' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'Ξ', color: '#627EEA' },
  { id: 'cardano', name: 'Cardano', symbol: '₳', color: '#0033CC' },
  { id: 'solana', name: 'Solana', symbol: '◎', color: '#14F195' },
  { id: 'ripple', name: 'XRP', symbol: '✕', color: '#23292F' },
];

export default function CryptoDashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [days, setDays] = useState('7');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (daysParam: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/crypto?ids=bitcoin,ethereum,cardano,solana,ripple&days=${daysParam}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setCryptoData(data.marketData);

      // Format historical data for chart
      const prices = data.historicalData.prices || [];
      const formatted = prices.map((item: [number, number]) => ({
        time: new Date(item[0]).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        price: Math.round(item[1]),
      }));
      setChartData(formatted);
    } catch (err) {
      setError('Failed to load crypto data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(days);
  }, [days]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading crypto data...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Crypto Dashboard</h1>
          <p className="text-slate-400">Real-time cryptocurrency market data</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Time Range Buttons */}
        <div className="flex gap-2 mb-8">
          {['1', '7', '30', '90'].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                days === d
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>

        {/* Crypto Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {CRYPTOS.map((crypto) => {
            const data = cryptoData?.[crypto.id];
            if (!data) return null;

            const change = data.usd_24h_change || 0;
            const isPositive = change >= 0;

            return (
              <div
                key={crypto.id}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ backgroundColor: crypto.color + '20' }}>
                    {crypto.symbol}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{crypto.name}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  ${data.usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
                <p
                  className={`text-sm font-medium ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isPositive ? '+' : ''}{change.toFixed(2)}%
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Vol: ${(data.usd_24h_vol / 1e9).toFixed(1)}B
                </p>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-4">Bitcoin Price Trend</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#E2E8F0' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          Data from CoinGecko API • Updated every 5 minutes
        </div>
      </div>
    </main>
  );
}
