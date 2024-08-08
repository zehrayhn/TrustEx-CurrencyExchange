package com.example.trustex.dao;

import com.example.trustex.entity.User;
import com.example.trustex.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    User findByVerificationToken(String token);

    Optional<User> findByIdNumber(String numberId);


    boolean existsByEmail(String email);

    Optional<User> findByCorporateCustomerNumber(String corporateCustomerNumber);

    Optional<User> findByResetPasswordToken(String token);

//    @Query(value = "SELECT TOP 1 * FROM users u WHERE u.id_number = :idNumber AND u.user_type = :userType", nativeQuery = true)
//    User findByIdNumberAndUserType(@Param("idNumber") String idNumber, @Param("userType") String userType);
    boolean existsByIdNumberAndUserType(String idNumber, UserType userType);

    List<User> findCorporateUsersByIdNumber(String idNumber);

    List<User> findIndividualUsersByIdNumber(String idNumber);

  //  List<User> findByIdNumberAndUserType(String idNumber, UserType userType);
  @Query("SELECT u FROM User u WHERE u.idNumber = :idNumber AND u.userType = :userType")
  List<User> findByIdNumberAndUserType(@Param("idNumber") String idNumber, @Param("userType") UserType userType);



}
