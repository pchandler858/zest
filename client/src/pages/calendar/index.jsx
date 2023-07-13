import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from "../../utils/mutations";
import { GET_EVENTS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
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
  const [editEvent] = useMutation(EDIT_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });
  const [currentEvents, setCurrentEvents] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleOpenEdit = (id, todo) => {
    setEditTodo(todo);
    setSelectedEventId(id);
    setOpenEdit(true);
  };

  const handleCloseAdd = async (add) => {
    setOpenAdd(false);
    if (add && todo && selectedDate) {
      await addEvent({
        variables: {
          todo,
          date: selectedDate,
        },
      });
      setTodo("");
    }
  };

  const handleCloseDelete = async (deleteEventBool) => {
    setOpenDelete(false);
    if (deleteEventBool) {
      await deleteEvent({
        variables: { id: selectedEvent.id },
      });
    }
  };

  const handleCloseEdit = async (edit) => {
    console.log(selectedEvent)
    setOpenEdit(false);
    if (edit && editTodo) {
      try {
        setSelectedDate(selectedEvent.start); // Set the selectedDate value here
        await editEvent({
          variables: {
            id: selectedEventId,
            todo: editTodo,
            date: selectedEvent.start, // Pass the selectedDate value to the mutation
          },
        });
        setEditTodo("");
      } catch (error) {
        console.error("Error in handleCloseEdit:", error);
      }
    }
  };

  useEffect(() => {
    if (data && data.calendars) {
      setCurrentEvents(data.calendars);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const handleDateClick = (selected) => {
    const selectedDate = selected.startStr;
    setSelectedDate(selectedDate);
    console.log(selectedDate)
    handleOpenAdd();
  };

  const handleEventClick = (clicked) => {
    setSelectedEvent(clicked.event);
    handleOpenDelete();
  };

  const formatDate = (dateString) => {
    const date = moment(parseInt(dateString, 10)).utcOffset("+00:00");
    return date.isValid() ? date.format("MMMM DD, YYYY") : "Invalid Date";
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Manage your events" />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          {/* Start Events Side Calendar */}
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
                  onClick={() => handleOpenEdit(event._id, event.todo)}
                >
                  <ListItemText
                    primary={event.todo}
                    secondary={formatDate(event.date)}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
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
              // right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title of your event
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event Title"
            type="text"
            fullWidth
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseAdd(false)}
            sx={{ color: colors.greenAccent[600] }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCloseAdd(true)}
            sx={{ color: colors.greenAccent[600] }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event{" "}
            {selectedEvent && ` '${selectedEvent.title}'`}??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDelete(false)}
            sx={{ color: colors.greenAccent[600] }}
          >
            No
          </Button>
          <Button
            onClick={() => handleCloseDelete(true)}
            sx={{ color: colors.greenAccent[600] }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new title of your event
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Event Title"
            type="text"
            fullWidth
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseEdit(false)}
            sx={{ color: colors.greenAccent[600] }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCloseEdit(true)}
            sx={{ color: colors.greenAccent[600] }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;
