import React from 'react'

const SideNav = () => {
    return (
        <div>
            <ul class="space-y-6 lg:space-y-2 border-l-2 border-slate-100 dark:border-slate-800">
                <li>
                    <a class="block focus:font-semibold border-l-2 pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" href="">
                        My Tickets
                    </a>
                </li>
                <li>
                    <a class="block border-l-2 pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" href="">
                        Transfer History
                    </a>
                </li>
                <li>
                    <a class="block border-l-2 pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" href="">
                        Receive Transfer
                    </a>
                </li>
                <li>
                    <a class="block border-l-2 pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300" href="">
                        My Profile
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SideNav