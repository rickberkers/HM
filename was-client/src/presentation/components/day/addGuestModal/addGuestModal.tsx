import { ErrorMessage } from "@hookform/error-message";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonNote } from "@ionic/react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Guest } from "../../../../domains/models/Attendance";
import { Commitment } from "../../../../domains/models/Commitment";
import { User } from "../../../../domains/models/User";
import { GuestList } from "../guestList/GuestList";

const MAX_GUESTS = 25;
export type GUEST_MODAL_ACTION = 'cancel' | 'confirm';

export type GuestModalProps = {
  onDismiss: (data: string[] | null, action: GUEST_MODAL_ACTION) => void,
  existingGuests: Guest[],
  member: User
}

const AddGuestModal = ({onDismiss, existingGuests, member}: GuestModalProps) => {

  const [guests, setGuests] = useState<Exclude<Commitment['guests'], null>>([]);
  const guestLimitReached = (existingGuests.length + guests.length) >= MAX_GUESTS;

  const {formState, control, handleSubmit, resetField } = useForm<{name: string}>({
    reValidateMode: "onSubmit"
  });

  const handleAddGuest = (data: {name: string}) => {
    const newGuests = guests;
    newGuests.push(data.name.trim());
    setGuests(newGuests);
    resetField("name");
  };

  const handleRemoveGuest = (guest: string) => {
    let newGuests: string[] = [];
    newGuests = newGuests.concat(guests);
    let index = newGuests.indexOf(guest);
    if (index !== -1) {
      newGuests.splice(index, 1);
      setGuests(newGuests);
    }
  };
  
  const isUniqueValidator = useCallback((value: string): string | true => {
    const disallowedNames = existingGuests.map(guest => guest.name).concat(guests ?? []);

    for (let index = 0; index < disallowedNames.length; index++) {
      if (disallowedNames[index].trim().toLowerCase() === value.trim().toLowerCase())
        return "Specified name was already added";
    }
    return true;
  }, [existingGuests, guests]);

  const isBelowLimitValidator = () => guestLimitReached ? "Guest limit was reached" : true;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle >Add guest</IonTitle>
          <IonButtons slot="end">
            <IonButton disabled={guests.length < 1} onClick={() => onDismiss(guests && guests.length > 0 ? guests : null, 'confirm')}>Confirm</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonItem className={formState.errors.name && "ion-invalid"}>
        <IonLabel position="stacked">Enter your guest's name</IonLabel>
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Name is required',
            maxLength: {
              value: MAX_GUESTS, 
              message: 'Name exceeds maximum length of 25'
            },
            validate: {
              isUnique: isUniqueValidator,
              isBelowLimit: isBelowLimitValidator
            },
          }}
          render={({ field }) => 
            <IonInput ref={e => e ? e.focus() : null} onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(handleAddGuest)();
              }
            }} value={field.value} placeholder="Guest's name" onIonChange={field.onChange} />
          }
        />
        <ErrorMessage
          errors={formState.errors}
          name={"name"}
          render={(({ message }) =>
              <IonNote className='ion-margin-bottom' slot="error">{message}</IonNote>
          )}
        />
      </IonItem>
      <IonButton class='ion-margin' expand='block' onClick={handleSubmit(handleAddGuest)}>Add</IonButton>
      <IonContent>
        <GuestList guests={guests.map(guest => ({addedBy: member, name: guest}))} onRemove={handleRemoveGuest} />
      </IonContent>
    </IonPage>
  );
};

export default AddGuestModal;