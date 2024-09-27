variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "container_image" {
  type    = string
  default = "524147404421.dkr.ecr.eu-west-1.amazonaws.com/nest-ecr-organization:966d5f1-2024-09-26-11-37"
}

variable "cluster_id" {
  type    = string
  default = "arn:aws:ecs:eu-west-1:524147404421:cluster/nest-ecs-microservice-cluster"
}

variable "default_vpc_id" {
  type    = string
  default = "vpc-0636baa2b10378148"
}

variable "alb_lb_listener_rule_arn" {
  type    = string
  default = "arn:aws:elasticloadbalancing:eu-west-1:524147404421:listener/app/nest-ecs-alb/0d7e2a1cf2f835cf/c2180cb3f514ac0f"
}

variable "default_subnet_a_id" {
  type    = string
  default = "subnet-0f2628a3d03818748"
}

variable "default_subnet_b_id" {
  type    = string
  default = "subnet-054a31781cae0c6f9"
}

variable "ecs_service_sg_id" {
  type    = string
  default = "sg-0440aed8e339e4166"
}

variable "ecs_task_execution_role_arn" {
  type    = string
  default = "arn:aws:iam::524147404421:role/ecsTasksExecutionRole"
}
