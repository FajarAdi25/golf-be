import { DataSource, QueryRunner } from "typeorm";
import { GolfRateRepositoryInterface } from "./golf_rate_repository";
import { RepositoryResponseInterface } from "../helper/repository_response";
import { StatusOK } from "../response/ok";
import { StatusNotFoundError } from "../response/not_found_error";
import { StatusInternalServerError } from "../response/internal_server_error";
import { GolfRateCreateRequest } from "../helper/golf_rate_create_request";
import { GolfRateUpdateRequest } from "../helper/golf_rate_update_request";
import { ACTIVE_STATUS, NATIONALITY } from "../entity/golf_rates";

class GolfRateRepositoryImpl implements GolfRateRepositoryInterface {
  getGolfRates = async (
    conn: QueryRunner | DataSource
  ): Promise<RepositoryResponseInterface> => {
    try {
      const query = `
        SELECT * 
        FROM golf_rates 
        WHERE active_status_id = '${ACTIVE_STATUS.ACTIVE}'
      `;

      const results = await conn.query(query);

      return StatusOK(results);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  getGolfRateById = async (
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface> => {
    try {
      const query = `
        SELECT * 
        FROM golf_rates 
        WHERE id = ? 
        AND active_status_id = '${ACTIVE_STATUS.ACTIVE}'
      `;

      const results = await conn.query(query, [id]);

      if (!results || results.length === 0) {
        return StatusNotFoundError("Golf rate not found");
      }

      return StatusOK(results[0]);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  getGolfRatesByNationality = async (
    conn: QueryRunner | DataSource,
    nationality: NATIONALITY
  ): Promise<RepositoryResponseInterface> => {
    try {
      const query = `
        SELECT * 
        FROM golf_rates 
        WHERE nationality = ? 
        AND active_status_id = '${ACTIVE_STATUS.ACTIVE}'
      `;

      const results = await conn.query(query, [nationality]);

      if (!results || results.length === 0) {
        return StatusNotFoundError(
          "No golf rates found for the specified nationality"
        );
      }

      return StatusOK(results);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  createGolfRate = async (
    conn: QueryRunner | DataSource,
    request: GolfRateCreateRequest
  ): Promise<RepositoryResponseInterface> => {
    try {
      const {
        company,
        golf_course,
        nationality,
        week_day,
        week_day_visitor,
        weekend_public_holiday,
        weekend_public_holiday_visitor,
        weekend_saturday_afternoon,
        weekend_saturday_afternoon_visitor,
        weekend_sunday_afternoon,
        weekend_sunday_afternoon_visitor,
        remarks,
        created_by,
        active_status_id,
      } = request;

      const query = `
        INSERT INTO golf_rates (
          company,
          golf_course,
          nationality,
          week_day,
          week_day_visitor,
          weekend_public_holiday,
          weekend_public_holiday_visitor,
          weekend_saturday_afternoon,
          weekend_saturday_afternoon_visitor,
          weekend_sunday_afternoon,
          weekend_sunday_afternoon_visitor,
          remarks,
          created_by,
          active_status_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        company,
        golf_course || null,
        nationality,
        week_day || null,
        week_day_visitor || null,
        weekend_public_holiday || null,
        weekend_public_holiday_visitor || null,
        weekend_saturday_afternoon || null,
        weekend_saturday_afternoon_visitor || null,
        weekend_sunday_afternoon || null,
        weekend_sunday_afternoon_visitor || null,
        remarks,
        created_by || null,
        active_status_id || ACTIVE_STATUS.ACTIVE,
      ];

      const result = await conn.query(query, params);

      const insertId = result?.insertId;

      if (insertId) {
        const getQuery = `
          SELECT * 
          FROM golf_rates 
          WHERE id = ?
        `;

        const [golfRates] = await conn.query(getQuery, [insertId]);

        if (golfRates && golfRates.length > 0) {
          return {
            code: 201,
            error: null,
            data: golfRates[0],
          };
        }
      }

      return {
        code: 201,
        error: null,
        data: result,
      };
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  updateGolfRate = async (
    conn: QueryRunner | DataSource,
    id: number,
    request: GolfRateUpdateRequest
  ): Promise<RepositoryResponseInterface> => {
    try {
      // First check if golf rate exists
      const checkQuery = `
        SELECT * 
        FROM golf_rates 
        WHERE id = ? 
        AND active_status_id = '${ACTIVE_STATUS.ACTIVE}'
      `;

      const [existingRate] = await conn.query(checkQuery, [id]);

      if (!existingRate || existingRate.length === 0) {
        return StatusNotFoundError("Golf rate not found");
      }

      // Build update query dynamically
      let updateFields = [];
      let params = [];

      if (request.company !== undefined) {
        updateFields.push("company = ?");
        params.push(request.company);
      }

      if (request.golf_course !== undefined) {
        updateFields.push("golf_course = ?");
        params.push(request.golf_course);
      }

      if (request.nationality !== undefined) {
        updateFields.push("nationality = ?");
        params.push(request.nationality);
      }

      if (request.week_day !== undefined) {
        updateFields.push("week_day = ?");
        params.push(request.week_day);
      }

      if (request.week_day_visitor !== undefined) {
        updateFields.push("week_day_visitor = ?");
        params.push(request.week_day_visitor);
      }

      if (request.weekend_public_holiday !== undefined) {
        updateFields.push("weekend_public_holiday = ?");
        params.push(request.weekend_public_holiday);
      }

      if (request.weekend_public_holiday_visitor !== undefined) {
        updateFields.push("weekend_public_holiday_visitor = ?");
        params.push(request.weekend_public_holiday_visitor);
      }

      if (request.weekend_saturday_afternoon !== undefined) {
        updateFields.push("weekend_saturday_afternoon = ?");
        params.push(request.weekend_saturday_afternoon);
      }

      if (request.weekend_saturday_afternoon_visitor !== undefined) {
        updateFields.push("weekend_saturday_afternoon_visitor = ?");
        params.push(request.weekend_saturday_afternoon_visitor);
      }

      if (request.weekend_sunday_afternoon !== undefined) {
        updateFields.push("weekend_sunday_afternoon = ?");
        params.push(request.weekend_sunday_afternoon);
      }

      if (request.weekend_sunday_afternoon_visitor !== undefined) {
        updateFields.push("weekend_sunday_afternoon_visitor = ?");
        params.push(request.weekend_sunday_afternoon_visitor);
      }

      if (request.remarks !== undefined) {
        updateFields.push("remarks = ?");
        params.push(request.remarks);
      }

      if (request.updated_by !== undefined) {
        updateFields.push("updated_by = ?");
        params.push(request.updated_by);
      }

      if (request.active_status_id !== undefined) {
        updateFields.push("active_status_id = ?");
        params.push(request.active_status_id);
      }

      // Add ID to params
      params.push(id);

      if (updateFields.length === 0) {
        return StatusOK(existingRate[0]);
      }

      const updateQuery = `
        UPDATE golf_rates 
        SET ${updateFields.join(", ")}, 
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;

      await conn.query(updateQuery, params);

      // Get updated record
      const [updatedData] = await conn.query(checkQuery, [id]);

      return StatusOK(updatedData[0]);
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };

  deleteGolfRate = async (
    conn: QueryRunner | DataSource,
    id: number
  ): Promise<RepositoryResponseInterface> => {
    try {
      const checkQuery = `
        SELECT * 
        FROM golf_rates 
        WHERE id = ? 
        AND active_status_id = '${ACTIVE_STATUS.ACTIVE}'
      `;

      const [existingRate] = await conn.query(checkQuery, [id]);

      if (!existingRate || existingRate.length === 0) {
        return StatusNotFoundError("Golf rate not found");
      }

      // Soft delete by updating active_status_id
      const deleteQuery = `
        UPDATE golf_rates 
        SET active_status_id = '${ACTIVE_STATUS.NOT_ACTIVE}',
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;

      await conn.query(deleteQuery, [id]);

      return StatusOK({ message: "Golf rate deleted successfully" });
    } catch (err) {
      return StatusInternalServerError(err);
    }
  };
}

export default GolfRateRepositoryImpl;
