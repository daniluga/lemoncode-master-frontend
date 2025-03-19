import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  CATEGORY,
  MemberDetail,
  PokemonDetails,
  RickAndMortyDetails,
} from "./detail.vm";

interface Props {
  itemDetail: CATEGORY;
  visible: boolean;
  onClose: () => void;
}

// Type guards para verificar qué tipo de detalle estamos usando
const isMemberDetail = (detail: CATEGORY): detail is MemberDetail =>
  "login" in detail;
const isPokemonDetail = (detail: CATEGORY): detail is PokemonDetails =>
  "types" in detail;
const isRickAndMortyDetail = (
  detail: CATEGORY
): detail is RickAndMortyDetails => "status" in detail;

export const DetailComponent: React.FC<Props> = (props: Props) => {
  const { itemDetail, visible, onClose } = props;

  const renderDetails = () => {
    if (isMemberDetail(itemDetail)) {
      return (
        <>
          <Typography variant="body2">
            <strong>Login:</strong> {itemDetail.login}
          </Typography>
          <Typography variant="body2">
            <strong>Company:</strong> {itemDetail.company ?? "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Bio:</strong> {itemDetail.bio ?? "N/A"}
          </Typography>
        </>
      );
    }
    if (isPokemonDetail(itemDetail)) {
      return (
        <>
          <Typography variant="body2">
            <strong>Types:</strong> {itemDetail.types}
          </Typography>
          <Typography variant="body2">
            <strong>Weight:</strong> {itemDetail.weight}
          </Typography>
          <Typography variant="body2">
            <strong>Height:</strong> {itemDetail.height}
          </Typography>
        </>
      );
    }
    if (isRickAndMortyDetail(itemDetail)) {
      return (
        <>
          <Typography variant="body2">
            <strong>Status:</strong> {itemDetail.status}
          </Typography>
          <Typography variant="body2">
            <strong>Species:</strong>
            {(itemDetail as RickAndMortyDetails).species}
          </Typography>
          <Typography variant="body2">
            <strong>Gender:</strong>
            {(itemDetail as RickAndMortyDetails).gender}
          </Typography>
          <Typography variant="body2">
            <strong>Origin:</strong>
            {(itemDetail as RickAndMortyDetails).origin}
          </Typography>
          <Typography variant="body2">
            <strong>Location:</strong>
            {(itemDetail as RickAndMortyDetails).location}
          </Typography>
        </>
      );
    }
  };

  return (
    <>
      {visible && (
        <Card
          sx={{
            flexGrow: 1,
            margin: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "sticky",
          }}
        >
          <Typography
            color="secondary"
            variant="h6"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            {itemDetail.name}
          </Typography>
          <CardMedia
            component="img"
            image={itemDetail.img}
            alt="avatar"
            sx={{
              height: 200,
              width: 200,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <CardContent style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography variant="body2">
              <strong>ID:</strong> {itemDetail.id}
            </Typography>
            {renderDetails()}
          </CardContent>
          <Button color="secondary" variant="contained" onClick={onClose}>
            Close detail
          </Button>
        </Card>
      )}
    </>
  );
};
