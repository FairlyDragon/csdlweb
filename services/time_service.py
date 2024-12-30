from datetime import datetime, timedelta
from fastapi import HTTPException, Query, status
from app.schemas.admin_schema import TimePeriod

# Helper function to get time period from request query parameters
# Validates that start_date is before end_date
# Depends function
async def get_time_period(start_date: datetime = Query(...), end_date: datetime = Query(...)):
    # Set the end_time to the ending of the day
    end_date = end_date.replace(hour = 23, minute = 59, second = 59)
    
    if start_date > end_date:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="start_date must be before end_date")
    
    return await TimePeriod(start_date=start_date, end_date=end_date)

# Get the day of the week from a given datetime object
async def get_weekday_index(time: datetime):
    # ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    # [0, 1, 2, 3, 4, 5, 6]
    return await time.weekday()


# Get the time difference between two datetime objects
async def get_time_difference(start_time: datetime, end_time: datetime):
    return await end_time - start_time

# Get the first day of the previous month
async def first_day_of_previous_month(current_datetime:datetime): 
    # first day of current month
    first_day_current_month = current_datetime.replace(day=1) 
    # subtract one day to get the last day of the previous month 
    last_day_previous_month = first_day_current_month - timedelta(days=1) 
    # Modify the 'last day of the previous month' to get 'the first day of the previous month'
    first_day_previous_month = last_day_previous_month.replace(day=1) 
    
    return await first_day_previous_month.replace(hour=0, minute=0, second=0, microsecond=0)

# Get the last day of the previous month
async def last_day_of_previous_month(current_datetime:datetime): 
    # first day of current month
    first_day_current_month = current_datetime.replace(day=1) 
    # subtract one day to get the last day of the previous month 
    last_day_previous_month = first_day_current_month - timedelta(days=1) 
    
    return await last_day_previous_month.replace(hour=23, minute=59, second=59)

# Get the first day of the current month
async def first_day_of_current_month(current_datetime:datetime): 
    return await current_datetime.replace(day=1, hour=0, minute=0, second=0)
