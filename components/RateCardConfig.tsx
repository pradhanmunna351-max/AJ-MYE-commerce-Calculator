
import React, { useState } from 'react';
import { ManualRateCard, ManualRateRule, ArticleType, Level } from '../types';

interface RateCardConfigProps {
  manualRateCard: ManualRateCard;
  setManualRateCard: (val: ManualRateCard) => void;
}

const RateCardConfig: React.FC<RateCardConfigProps> = ({ manualRateCard, setManualRateCard }) => {
  const [editingRule, setEditingRule] = useState<Partial<ManualRateRule> | null>(null);

  const toggleEnabled = () => {
    setManualRateCard({ ...manualRateCard, enabled: !manualRateCard.enabled });
  };

  const addRule = () => {
    setEditingRule({
      articleType: 'ALL',
      level: 'ALL',
      minPrice: 0,
      maxPrice: 99999,
      commissionPercent: 14.16,
      fixedFee: 27,
      gtaFee: 83
    });
  };

  const saveRule = () => {
    if (!editingRule) return;
    const newRule = editingRule as ManualRateRule;
    setManualRateCard({
      ...manualRateCard,
      rules: [...manualRateCard.rules, newRule]
    });
    setEditingRule(null);
  };

  const deleteRule = (index: number) => {
    const newRules = [...manualRateCard.rules];
    newRules.splice(index, 1);
    setManualRateCard({ ...manualRateCard, rules: newRules });
  };

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-white p-8 rounded-[3rem] border border-forest-accent shadow-2xl dark:bg-forest-pine/40 dark:border-forest-leaf/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-forest-leaf/5 blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-forest-accent/50 dark:border-forest-leaf/20">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-forest-pine rounded-3xl flex items-center justify-center text-white shadow-xl dark:bg-forest-leaf rotate-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-forest-pine uppercase tracking-tight dark:text-forest-mint italic">Advanced Rate Matrix</h2>
              <p className="text-[10px] text-forest-leaf/50 font-black uppercase tracking-[0.3em] mt-1">Multi-Slab Pricing Logic • Myntra Only</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={addRule}
              className="px-6 py-3 bg-forest-pine text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg dark:bg-forest-leaf"
            >
              Add New Slab
            </button>
            <div className="flex items-center gap-4 bg-forest-mint/50 p-2.5 rounded-[1.5rem] border border-forest-accent dark:bg-forest-pine/60 shadow-inner">
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 ${manualRateCard.enabled ? 'text-forest-leaf' : 'text-forest-leaf/30'}`}>
                {manualRateCard.enabled ? 'MATRIX ENGAGED' : 'PLATFORM DEFAULT'}
              </span>
              <button 
                onClick={toggleEnabled}
                className={`w-14 h-8 rounded-full relative transition-all shadow-inner border border-black/5 ${manualRateCard.enabled ? 'bg-forest-leaf' : 'bg-forest-accent'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all transform shadow-lg ${manualRateCard.enabled ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {editingRule && (
          <div className="mb-12 p-8 bg-forest-mint/30 rounded-[2.5rem] border-2 border-forest-leaf/40 shadow-inner animate-in zoom-in duration-300 dark:bg-forest-pine/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">Article Group</label>
                <select 
                  value={editingRule.articleType}
                  onChange={e => setEditingRule({...editingRule, articleType: e.target.value as any})}
                  className="w-full px-4 py-3 bg-white border border-forest-accent rounded-2xl font-bold text-sm text-gray-900 shadow-sm outline-none focus:border-forest-leaf dark:bg-forest-pine dark:text-forest-mint dark:border-forest-leaf/40"
                >
                  <option value="ALL">ALL ARTICLES</option>
                  {Object.values(ArticleType).map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">Tier Level</label>
                <select 
                  value={editingRule.level}
                  onChange={e => setEditingRule({...editingRule, level: e.target.value as any})}
                  className="w-full px-4 py-3 bg-white border border-forest-accent rounded-2xl font-bold text-sm text-gray-900 shadow-sm outline-none focus:border-forest-leaf dark:bg-forest-pine dark:text-forest-mint dark:border-forest-leaf/40"
                >
                  <option value="ALL">ALL LEVELS</option>
                  {Object.values(Level).map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">Price Start (Min)</label>
                <input 
                  type="number"
                  value={editingRule.minPrice}
                  onChange={e => setEditingRule({...editingRule, minPrice: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-white border border-forest-accent rounded-2xl font-black text-lg text-forest-pine shadow-sm outline-none focus:border-forest-leaf dark:bg-forest-pine dark:text-forest-mint"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">Price End (Max)</label>
                <input 
                  type="number"
                  value={editingRule.maxPrice}
                  onChange={e => setEditingRule({...editingRule, maxPrice: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-white border border-forest-accent rounded-2xl font-black text-lg text-forest-pine shadow-sm outline-none focus:border-forest-leaf dark:bg-forest-pine dark:text-forest-mint"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">Commission % Override</label>
                <input 
                  type="number"
                  value={editingRule.commissionPercent}
                  onChange={e => setEditingRule({...editingRule, commissionPercent: Number(e.target.value)})}
                  className="w-full px-4 py-4 bg-white border-2 border-forest-leaf/20 rounded-2xl font-black text-3xl text-forest-pine text-center shadow-md focus:border-forest-leaf outline-none dark:bg-forest-pine dark:text-forest-mint"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">Fixed Fee (Excl. GST)</label>
                <input 
                  type="number"
                  value={editingRule.fixedFee}
                  onChange={e => setEditingRule({...editingRule, fixedFee: Number(e.target.value)})}
                  className="w-full px-4 py-4 bg-white border-2 border-forest-leaf/20 rounded-2xl font-black text-3xl text-forest-pine text-center shadow-md focus:border-forest-leaf outline-none dark:bg-forest-pine dark:text-forest-mint"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-forest-leaf uppercase tracking-widest px-1">GTA Fee (Logistics)</label>
                <input 
                  type="number"
                  value={editingRule.gtaFee}
                  onChange={e => setEditingRule({...editingRule, gtaFee: Number(e.target.value)})}
                  className="w-full px-4 py-4 bg-white border-2 border-forest-leaf/20 rounded-2xl font-black text-3xl text-forest-pine text-center shadow-md focus:border-forest-leaf outline-none dark:bg-forest-pine dark:text-forest-mint"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setEditingRule(null)}
                className="px-8 py-3 bg-white border border-forest-accent rounded-xl text-[10px] font-black text-forest-leaf uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all dark:bg-forest-pine/40"
              >
                Discard
              </button>
              <button 
                onClick={saveRule}
                className="px-12 py-3 bg-forest-leaf text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
              >
                Save Matrix Slab
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-forest-accent/50 text-[10px] font-black text-forest-leaf/50 uppercase tracking-widest">
                <th className="px-6 py-4 text-left">Filter (Art/Lvl)</th>
                <th className="px-6 py-4 text-left">Slab Range</th>
                <th className="px-6 py-4 text-center">Comm %</th>
                <th className="px-6 py-4 text-center">Fixed</th>
                <th className="px-6 py-4 text-center">GTA</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-accent/30">
              {manualRateCard.rules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <svg className="w-12 h-12 text-forest-leaf" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <span className="text-[10px] font-black uppercase tracking-widest">No custom slabs configured</span>
                    </div>
                  </td>
                </tr>
              ) : (
                manualRateCard.rules.map((rule, idx) => (
                  <tr key={idx} className="group hover:bg-forest-mint/50 transition-all dark:hover:bg-forest-pine/20">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-forest-pine dark:text-forest-mint">{rule.articleType === 'ALL' ? 'GLOBAL ARTICLES' : rule.articleType.toUpperCase()}</span>
                        <span className="text-[9px] font-bold text-forest-leaf/60 uppercase">{rule.level === 'ALL' ? 'ANY LOGISTICS LEVEL' : rule.level}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-accent/40 rounded-lg text-[10px] font-black text-forest-leaf dark:bg-forest-leaf/20 dark:text-forest-sage">
                        ₹{rule.minPrice} - ₹{rule.maxPrice}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-black text-lg text-forest-pine dark:text-forest-mint">
                      {rule.commissionPercent}%
                    </td>
                    <td className="px-6 py-5 text-center font-black text-lg text-forest-pine dark:text-forest-mint">
                      ₹{rule.fixedFee}
                    </td>
                    <td className="px-6 py-5 text-center font-black text-lg text-forest-pine dark:text-forest-mint">
                      ₹{rule.gtaFee}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => deleteRule(idx)}
                        className="p-2 bg-white border border-forest-accent rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm dark:bg-forest-pine/60"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RateCardConfig;
