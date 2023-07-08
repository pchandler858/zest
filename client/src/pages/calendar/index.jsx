import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import listPlugin from "@fullcalendar/list";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { GET_EVENTS, ADD_EVENT, DELETE_EVENT } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Apollo hooks
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [addEvent] = useMutation(ADD_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    if (data && data.calendars) {
      setCurrentEvents(data.calendars);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const handleDateClick = async (selected) => {
    const todo = prompt("Please enter the title of your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (todo) {
      await addEvent({
        variables: {
          todo,
          date: selected.startStr,
        },
      });
    }
  };

  const handleEventClick = async (clicked) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clicked.event.title}'?`
      )
    ) {
      console.log(clicked.event.id);
      const { data } = await deleteEvent({
        variables: { id: clicked.event.id },
      });
    }
  };

  const formatDate = (dateString) => {
    const date = moment(parseInt(dateString, 10)).utcOffset("+00:00");
    return date.isValid() ? date.format("MMMM DD, YYYY") : "Invalid Date";
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Manage your events" />
      <Box display="flex" justifyContent="space-between">
        {/* calendar sidebar */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h6">Events</Typography>
          <List>
            {data &&
              data.calendars &&
              data.calendars.map((event) => (
                <ListItem
                  key={event._id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.todo}
                    secondary={formatDate(event.date)}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
        {/* calendar */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents.map((event) => ({
              id: event._id,
              title: event.todo,
              start: moment(parseInt(event.date, 10))
                .utcOffset("+00:00")
                .format("YYYY-MM-DD"),
              end: moment(parseInt(event.date, 10))
                .utcOffset("+00:00")
                .format("YYYY-MM-DD"),
            }))}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
