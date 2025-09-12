package users.rishik.Learnex.Util;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import users.rishik.Learnex.Models.Roles;
import users.rishik.Learnex.Models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    User toUsers(UserDto dto);

    @AfterMapping
    default void setDefaultRole(@MappingTarget User user) {
        user.setRole(Roles.STUDENT);
    }
}
