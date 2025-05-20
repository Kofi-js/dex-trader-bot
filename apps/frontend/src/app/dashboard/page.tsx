'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <h1 className="text-3xl font-bold mb-6">Trading Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* P&L Card */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Total P&L</h2>
              <p className="text-3xl font-bold text-green-400">$0.00</p>
            </div>

            {/* Active Trades Card */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Active Trades</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            {/* Win Rate Card */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Win Rate</h2>
              <p className="text-3xl font-bold text-blue-400">0%</p>
            </div>
          </div>

          {/* Recent Trades Table */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pair</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Side</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">P&L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-300" colSpan={5}>
                      No trades yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 