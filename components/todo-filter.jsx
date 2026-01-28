"use client";

import React from 'react'
import { useTodoStore } from '@/store/todo-store';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const TodoFilter = () => {
	const { filter, setFilter, completedCount, activeCount } = useTodoStore();
	const filters = [
		{ key: "all", label: "All", count: activeCount() + completedCount() },
		{ key: "active", label: "Active", count: activeCount() },
		{ key: "completed", label: "Completed", count: completedCount() },
	]
  return (
	  <Card className="mb-6">
		  <CardContent className= "p-4">
			  <div className='flex items-center justify-between'>
				  <div className="flex gap-2">
					  {
						  filters.map(({ key, label, count }) => (
							  <Button
								  key={key}
								  variant={filter === key ? "default" : "outline"}
								  size='sm'
								  onClick={() => setFilter(key)}
								  className={'relative'}
							  >
								  {label}
								  {count > 0 && (
									  <span className="ml-2 rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs">
										  {count}
									  </span>
								  )}
								  
							</Button>  
						  ))
					  }
				  </div>
				  <p className='text-muted-foreground'> Active {activeCount()} , Completed {completedCount()}</p>
			  </div>
		  </CardContent>
	</Card>
  )
}

export default TodoFilter