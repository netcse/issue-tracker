'use client'

import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'ALL';

  return (
    <Select.Root
      value={currentStatus}
      onValueChange={(status) => {
        const query = status === 'ALL' ? '' : `?status=${status}`
        router.push(`/issues${query}`)
      }}
    >
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
