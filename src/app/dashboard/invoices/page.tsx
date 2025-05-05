import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { columns } from './columns'
import { DataTable } from './data-table'

const invoices = [
  {
    id: 1,
    name: 'Buy a MackBook Pro',
    amount: 1000,
    dueDate: '2023-01-01',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Buy a iPhone 14 Pro',
    amount: 2000,
    dueDate: '2023-02-01',
    status: 'Paid',
  },
  {
    id: 3,
    name: 'Sell a Lenovo ThinkPad',
    amount: 4500,
    dueDate: '2023-02-01',
    status: 'Paid',
  },
  {
    id: 4,
    name: 'Create Kian Ertebat Resume',
    amount: 3000,
    dueDate: '2023-03-01',
    status: 'Overdue',
  },
]

export default function Page() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Invoices</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <DataTable columns={columns} data={invoices} />
      </main>
    </>
  )
}
