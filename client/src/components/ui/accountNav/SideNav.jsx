'use client'
import Link from "next/link";
import {useState} from 'react';

const SideNav = ({activeTab}) => {
    
    return (
        <div>
            <ul className="space-y-6 lg:space-y-2 border-l-2 border-slate-100 dark:border-slate-800">
                <li>
                    <Link className={`${activeTab === 0 ? 'font-semibold border-slate-500': 'border-transparent'} block focus:font-semibold border-l-2 pl-4 -ml-px hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`}
                    href="/account/tickets">
                        My Tickets
                    </Link>
                </li>
                <li>
                    <Link className={`${activeTab === 1 ? 'font-semibold border-slate-500': 'border-transparent'} block focus:font-semibold border-l-2 pl-4 -ml-px hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`}
                    href="/account/resell-tickets">
                        Resell Tickets
                    </Link>
                </li>
                <li>
                    <Link className={`${activeTab === 2 ? 'font-semibold border-slate-500': 'border-transparent'} block focus:font-semibold border-l-2 pl-4 -ml-px  hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`}
                    href="/account/transaction-history">
                        Transaction History
                    </Link>
                </li>
                <li>
                    <Link className={`${activeTab === 3 ? 'font-semibold border-slate-500': 'border-transparent'} block focus:font-semibold border-l-2 pl-4 -ml-px hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`}
                    href="/account/receive-transfer">
                        Receive Transfer
                    </Link>
                </li>
                <li>
                    <Link className={`${activeTab === 4 ? 'font-semibold border-slate-500': 'border-transparent'} block focus:font-semibold border-l-2 pl-4 -ml-px hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`}
                    href="/account/transfer-history">
                        Transfer History
                    </Link> 
                </li>
                <li>
                    <Link className={`${activeTab === 5 ? 'font-semibold border-slate-500': 'border-transparent'} block focus:font-semibold border-l-2 pl-4 -ml-px hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300`}
                    href="/account/profile">
                        My Profile
                    </Link> 
                </li>
            </ul>
        </div>
    )
}

export default SideNav