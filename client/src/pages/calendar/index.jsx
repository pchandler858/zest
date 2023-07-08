import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Apollo hooks
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [addEvent] = useMutation(ADD_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  // Handle loading and error states
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  // todo: convert to Modal
  const handleDateClick = async (selected) => {
    console.log(selected);
    const todo = prompt("Please enter the title of your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect(); // clear date selection

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
        `Are you sure you want to delete the event '${clicked.event.todo}'?`
      )
    ) {
      await deleteEvent({ variables: { id: clicked.event.id } });
    }
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
              data.events &&
              data.events.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(new Date(event.start), {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
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
            // eventsSet={(events) => setEvents(events)}
            events={data ? data.events : []}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
