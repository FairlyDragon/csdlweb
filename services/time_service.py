from datetime import datetime, timedelta
import calendar
from fastapi import HTTPException, Query, status
from schemas.admin_schema import TimePeriod

# Helper function to get time period from request query parameters
# Validates that start_date is before end_date
# Depends function
async def get_time_period(start_date: datetime = Query(...), end_date: datetime = Query(...)) -> TimePeriod:
    # Set the end_time to the ending of the day
    end_date = end_date.replace(hour=23, minute=59, second=59)
    
    if start_date > end_date:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="start_date must be before end_date")
    
    return TimePeriod(start_date=start_date, end_date=end_date)

# Get the day of the week from a given datetime object
def get_weekday_index(time: datetime) -> int:
    # ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    # [0, 1, 2, 3, 4, 5, 6]
    return time.weekday()

# Get the time difference between two datetime objects
def get_time_difference(start_time: datetime, end_time: datetime) -> timedelta:
    return end_time - start_time

# Get the first day of the previous month
# For Pie Chart in Dashboard Center
def first_day_of_previous_month(current_datetime: datetime) -> datetime:
    # first day of current month
    first_day_current_month = current_datetime.replace(day=1)
    # subtract one day to get the last day of the previous month
    last_day_previous_month = first_day_current_month - timedelta(days=1)
    # Modify the 'last day of the previous month' to get 'the first day of the previous month'
    first_day_previous_month = last_day_previous_month.replace(day=1)
    
    return first_day_previous_month.replace(hour=0, minute=0, second=0, microsecond=0)

# Get the last day of the previous month
# For Pie Chart in Dashboard Center
def last_day_of_previous_month(current_datetime: datetime) -> datetime:
    # first day of current month
    first_day_current_month = current_datetime.replace(day=1)
    # subtract one day to get the last day of the previous month
    last_day_previous_month = first_day_current_month - timedelta(days=1)
    
    return last_day_previous_month.replace(hour=23, minute=59, second=59)

# Get Monday of current week (dashboard center periodicity = "daily")
def get_monday_of_current_time(current_time: datetime) -> datetime:
    start_of_week = current_time - timedelta(days=current_time.weekday())
    
    return start_of_week.replace(hour=0, minute=0, second=0)

# Get timeline as a list: [(stime, etime), (stime, etime), ...]. Each element is a tuple of (start time and end time).
# length of the list depends on the periodicity. 
# E.g. periodicity = "daily" -> length = 7  
def get_timeline_daily(monday: datetime) -> list:
    timeline = []
    start_time = get_start_time_of_day(monday)
    
    for i in range(7):
        etime = get_end_time_of_day(start_time)
        
        timeline.append([start_time, etime])
        start_time = etime + timedelta(seconds=1)
        
    return timeline

# periodicity = "weekly" -> length = 4
def get_timeline_weekly(current_time: datetime) -> list:
    timeline = []
    start_time = get_start_of_month(current_time)
    
    for i in range(4):
        etime = get_end_of_week(start_time)
        
        timeline.append([start_time, etime])
        # Set the start time of the next week
        start_time = etime + timedelta(seconds=1)
        
    return timeline

# periodicity = "monthly" -> length = 12
def get_timeline_monthly(current_time: datetime) -> list:
    timeline = []
    start_time = get_start_of_year(current_time)
    
    for i in range(12):
        etime = get_end_of_month(start_time)
        
        timeline.append([start_time, etime])
        # Set the start time of the next month
        start_time = etime + timedelta(seconds=1)
        
    return timeline

# Get the start time of the week in the month
def get_start_of_month(current_time: datetime) -> datetime:
    return current_time.replace(day=1, hour=0, minute=0, second=0)

# Get the end time of the week
def get_end_of_week(current_datetime: datetime) -> datetime:
    # Find Sunday of the current week
    end_of_week = current_datetime + timedelta(days=(6 - current_datetime.weekday()))
    # Set 23:59:59
    end_of_week = end_of_week.replace(hour=23, minute=59, second=59)
    
    return end_of_week

# Get the end time of the day
def get_end_time_of_day(current_day: datetime) -> datetime:
    return current_day.replace(hour=23, minute=59, second=59)

# Get the start time of the day IN WEEK
def get_start_time_of_day(current_day: datetime) -> datetime:
    return current_day.replace(hour=0, minute=0, second=0)

# Get the start time of the year
def get_start_of_year(current_time: datetime) -> datetime:
    return current_time.replace(month=1, day=1, hour=0, minute=0, second=0)

# Get the end time of the year
def get_end_of_month(current_datetime: datetime) -> datetime:
    # Get the last day of the month
    last_day_of_month = calendar.monthrange(current_datetime.year, current_datetime.month)[1]
    # Set the last day of the month
    end_of_month = current_datetime.replace(day=last_day_of_month, hour=23, minute=59, second=59)
    
    return end_of_month
