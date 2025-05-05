'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Atom, Building, Folder, PieChart, Settings, Users } from 'lucide-react'
import type * as React from 'react'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  projects: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: PieChart,
    },
    {
      name: 'Invoices',
      url: '/dashboard/invoices',
      icon: Folder,
    },
    {
      name: 'Customers',
      url: '/dashboard/customers',
      icon: Users,
    },
    {
      name: 'Information',
      url: '/dashboard/information',
      icon: Building,
    },
    {
      name: 'Settings',
      url: '/dashboard/settings',
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[slot=sidebar-menu-button]:!px-2 h-8 py-4 font-bold"
              asChild
            >
              <a href="/">
                <Atom className="fill-blue-600/10 stroke-2 stroke-blue-600 dark:stroke-blue-400 dark:fill-blue-400/10" />
                <span className="text-blue-600 dark:text-blue-400">
                  Factore
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
