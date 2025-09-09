import React, { useState } from 'react';
import { ChevronDown, ChevronRight, User, Mail, Calendar } from 'lucide-react';
import { missedOpportunities } from '../../api';

const MissedOpportunitiesTab: React.FC = () => {
  const [expandedTables, setExpandedTables] = useState<Set<number>>(new Set());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const toggleTableExpansion = (index: number) => {
    const newExpanded = new Set(expandedTables);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTables(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Missed Opportunities
        </h2>
        <div className="space-y-6">
          {missedOpportunities.map((opportunity, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="bg-red-50 border-l-4 border-red-400 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {opportunity.program}
                    </h3>
                    <p className="text-gray-600 mb-3">{opportunity.reason}</p>
                    <div className="flex items-center space-x-6">
                      <span className="text-sm text-gray-600">
                        Missed Patients:{" "}
                        <strong className="text-red-600">{opportunity.missedPatients}</strong>
                      </span>
                      <span className="text-sm text-red-600">
                        Lost Earnings:{" "}
                        <strong>
                          {formatCurrency(opportunity.potentialEarnings)}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTableExpansion(index)}
                      className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors border border-gray-200"
                    >
                      {expandedTables.has(index) ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                      <span>
                        {expandedTables.has(index) ? "Hide Members" : "View Members"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {expandedTables.has(index) && (
                <div className="bg-white border-t border-gray-200">
                  <div className="p-6">
                    <h4 className="text-base font-semibold text-gray-900 mb-4">
                      Missed Members List
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>Full Name</span>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <div className="flex items-center space-x-1">
                                <Mail className="h-4 w-4" />
                                <span>Email</span>
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Member ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Date of Birth</span>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {opportunity.members.map((member, memberIndex) => (
                            <tr key={memberIndex} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {member.fullName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {member.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {member.memberId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {member.dob}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Total Missed Revenue
              </h3>
              <p className="text-gray-600 mt-1">
                Revenue that could be recovered
              </p>
            </div>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(
                missedOpportunities.reduce(
                  (sum, opp) => sum + opp.potentialEarnings,
                  0
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissedOpportunitiesTab;
